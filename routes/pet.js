const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Pet = require('./../models/Pet')
const path = require('path')



// 1. GET pets --> /pets
// get all pets (accept filters)


// 2. GET pet --> /pets/:id
// get single pet by id


// 3. POST pet --> /pets
// Create new Pet

module.exports = router