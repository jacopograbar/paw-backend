const express = require("express");
const router = express.Router();
const Utils = require("./../utils");
const Application = require("./../models/Application");
const path = require("path");

// 1. GET applications --> /applications/:accessLevel/:userID
// Get all applications for a shelter or seeker profile
router.get("/:accessLevel/:userID", Utils.authenticateToken, (req, res) => {
  if (req.params.accessLevel == 1) {
    Application.find({ adopter: req.params.userID })
      .populate(
        "shelter",
        "_id name email state address accessLevel profilePic"
      )
      .populate(
        "adopter",
        "_id name email state address accessLevel profilePic"
      )
      .populate("pet", "_id name petType breed age gender images")
      .then((applications) => {
        res.json(applications);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Couldn't fetch applications list for this shelter.",
          error: err,
        });
      });
  } else {
    Application.find({ shelter: req.params.userID })
      .populate(
        "shelter",
        "_id name email state address accessLevel profilePic"
      )
      .populate(
        "adopter",
        "_id name email state address accessLevel profilePic"
      )
      .populate("pet", "_id name petType breed age gender images")
      .then((applications) => {
        res.json(applications);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Couldn't fetch applications list for this shelter.",
          error: err,
        });
      });
  }
});

// 1. GET applications --> /applications/:userID
// Get all applications for a user

// 2. POST applications --> /applications
// Create a new application obj

// 3. DELETE applications --> /applications/:id
// Delete an application by id

module.exports = router;
