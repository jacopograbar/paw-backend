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

// 2. GET application by ID --> /applications/:ID
// Get application data given an ID

router.get("/:id", Utils.authenticateToken, (req, res) => {
  Application.findById(req.params.id)
    .populate("shelter", "_id name email state address accessLevel profilePic")
    .populate("adopter", "_id name email state address accessLevel profilePic")
    .populate("pet", "_id name petType breed age gender images")
    .then((application) => {
      res.json(application);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Couldn't find application",
        error: err,
      });
    });
});

// 3. POST applications --> /applications
// Create a new application obj
router.post("/", (req, res) => {
  // validate request
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ message: "Application content can not be empty" });
  }
  // create new user
  let newApplication = new Application(req.body);
  newApplication
    .save()
    .then((application) => {
      // success!
      // return 201 status with user object
      return res.status(201).json(application);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: "Problem creating application",
        error: err,
      });
    });
});

// 4. PUT applications --> /applications/:id
// Approve or reject an application by id
router.put("/:id", Utils.authenticateToken, (req, res) => {
  // validate request
  if (!req.body.status)
    return res.status(400).json({message:"Application status can't be empty"});

  Application.findByIdAndUpdate(req.params.id, {status: req.body.status})
    .then((application) => res.json(application))
    .catch((err) => {
      res.status(500).json({
        message: "Problem processing application.",
        error: err,
      });
    });
});

// 4. DELETE applications --> /applications/:id
// Delete an application by id

module.exports = router;
