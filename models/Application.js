const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Utils = require("../utils");

// application object schema
const applicationSchema = new mongoose.Schema(
  {
    pet: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'Pet'
    },
    adopter: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    shelter: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    status: {
      type: Number,
      required: true,
      default: 2,
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
