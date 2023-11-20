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

module.exports = router;
