const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Utils = require("../utils");

// application object schema
const applicationSchema = new mongoose.Schema(
  {
    petID: {
      type: String,
      require: true,
    },
    shelterID: {
      type: String,
      required: true,
    },
    adopterID: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// model
const applicationModel = mongoose.model("Application", applicationSchema);

// export
module.exports = applicationModel;
