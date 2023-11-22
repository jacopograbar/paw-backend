const express = require("express");
const router = express.Router();
const Utils = require("./../utils");
const User = require("./../models/User");
const path = require("path");

// GET - get single user -------------------------------------------------------
router.get("/:id", Utils.authenticateToken, (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Couldn't get user data",
        error: err,
      });
    });
});

// GET - get all shelters / seekers (define accessLevel in body req) -------------------------------------------------------
router.get("/list/:accessLevel", Utils.authenticateToken, (req, res) => {
  User.find({ accessLevel: req.params.accessLevel })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Couldn't fetch users list",
        error: err,
      });
    });
});

// PUT - update new user status ---------------------------------------------
router.put("/status/:id", Utils.authenticateToken, async (req, res) => {
  // validate request
  if (!req.body) return res.status(400).send("Body request cannot be empty.");
  User.findByIdAndUpdate(req.params.id, { newUser: false })
    .then((user) => res.json(user))
    .catch((err) => {
      res.status(500).json({
        message: "Problem updating use status",
        error: err,
      });
    });
});

// PUT - update user ---------------------------------------------
router.put("/:id", Utils.authenticateToken, async (req, res) => {
  // validate request
  if (!req.body) return res.status(400).send("Body request cannot be empty.");

  let avatarFilename = null;

  // if avatar image exists, upload!
  if (req.files && req.files.profilePic) {
    // upload avater image then update user
    let uploadPath = path.join(__dirname, "..", "public", "images");
    avatarFilename = await Utils.uploadFile(req.files.profilePic, uploadPath);
    // update user with all fields including profile pic
    updateUser({
      name: req.body.name,
      email: req.body.email,
      animals: req.body.animals,
      state: req.body.state,
      address: req.body.address,
      bio: req.body.bio,
      profilePic: avatarFilename,
    });
  } else {
    // update user without profile pic
    updateUser({
      name: req.body.name,
      email: req.body.email,
      animals: req.body.animals,
      state: req.body.state,
      address: req.body.address,
      bio: req.body.bio,
    });
  }

  // update User
  function updateUser(update) {
    User.findByIdAndUpdate(req.params.id, update, { new: true })
      .then((user) => res.json(user))
      .catch((err) => {
        res.status(500).json({
          message: "Problem updating user",
          error: err,
        });
      });
  }
});

// POST - create new user --------------------------------------
router.post("/", (req, res) => {
  // validate request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "User content can not be empty" });
  }

  // check account with email doen't already exist
  User.findOne({ email: req.body.email }).then((user) => {
    if (user != null) {
      return res.status(400).json({
        message: "email already in use, use different email address",
      });
    }
    // create new user
    let newUser = new User(req.body);
    newUser
      .save()
      .then((user) => {
        // success!
        // return 201 status with user object
        return res.status(201).json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({
          message: "Problem creating account",
          error: err,
        });
      });
  });
});

module.exports = router;
