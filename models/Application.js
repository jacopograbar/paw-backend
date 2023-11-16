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
    adopterID: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

// model
const applicationModel = mongoose.model("Application", applicationSchema);

// export
module.exports = applicationModel;
