const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Utils = require("../utils");

// pet object schema
const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: false,
      default: "Tabby",
    },
    age: {
      type: Number,
      required: true,
    },
    vaccinated: {
      type: Boolean,
      required: true,
    },
    friendliness: {
      type: Number,
      required: false,
    },
    sheter: {
      type: String,
      required: true,
    },
    diseases: {
      type: [String],
      required: false,
    },
    images: {
      type: [Buffer],
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// model
const petModel = mongoose.model("Pet", petSchema);

// export
module.exports = petModel;
