const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Application = require('./../models/Application')
const path = require('path')

// 1. GET applications --> /applications/:userID
// Get all applications for a shelter or pet seeker


// 2. POST applications --> /applications
// Create a new application obj


// 3. DELETE applications --> /applications/:id
// Delete an application by id

module.exports = router