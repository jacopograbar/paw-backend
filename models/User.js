const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Utils = require("./../utils");
require("mongoose-type-email");

// user object schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    animals: {
      type: [String],
      required: true,
    },
    profilePic: {
      type: String,
      required: false,
    },
    accessLevel: {
      type: Number,
      required: true,
    },
    newUser: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

// encrypt password field on save
userSchema.pre("save", function (next) {
  // check if password is present and is modifed
  if (this.password && this.isModified()) {
    this.password = Utils.hashPassword(this.password);
  }
  next();
});

// model
const userModel = mongoose.model("User", userSchema);

// export
module.exports = userModel;
