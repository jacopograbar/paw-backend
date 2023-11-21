const express = require("express");
const router = express.Router();
const Utils = require("./../utils");
const Pet = require("./../models/Pet");
const path = require("path");

// 1. GET pets --> /pets
// get all pets (accept filters)
router.get("/", Utils.authenticateToken, (req, res) => {
  Pet.find()
    .populate("shelter", "_id name email state address accessLevel profilePic")
    .then((pets) => {
      if (pets == null) {
        return res.status(404).json({
          message: "No pets found",
        });
      }
      res.json(pets);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Problem fetching pets",
      });
    });
});

// 2. GET pet --> /pets/:id
// get single pet by id
router.get("/:id", Utils.authenticateToken, (req, res) => {
  Pet.findById(req.params.id)
    .populate("shelter", "_id name email state address accessLevel profilePic")
    .then((pet) => {
      res.json(pet);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Couldn't find pet",
        error: err,
      });
    });
});

// 3. POST pet --> /pets
// Create new Pet
router.post("/", Utils.authenticateToken, async (req, res) => {
  // validate request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "Pet data can not be empty" });
  }

  let imagesNames = [];

  for (const file of req.files.images) {
    // upload image then update user
    let uploadPath = path.join(__dirname, "..", "public", "images");
    const fileName = await Utils.uploadFile(file, uploadPath);
    imagesNames.push(fileName);
    console.log(imagesNames, fileName);
  }

  // create new pet
  createPet({
    name: req.body.name,
    petType: req.body.petType,
    breed: req.body.breed,
    age: req.body.age,
    diseases: req.body.diseases ? req.body.diseases : [],
    vaccinated: req.body.vaccinated,
    gender: req.body.gender,
    notes: req.body.notes,
    images: imagesNames,
    friendliness: req.body.friendliness,
    shelter: req.body.shelter,
  });

  // create new Pet
  function createPet(body) {
    let newPet = new Pet(body);
    newPet
      .save()
      .then((pet) => {
        // success!
        // return 201 status with user object
        return res.status(201).json(pet);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({
          message: "Problem creating pet",
          error: err,
        });
      });
  }
});

module.exports = router;
