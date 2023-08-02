const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is Required"],
    },
    email: {
      type: "String",
      required: [true, "Email is Required"],
    },
    password: {
      type: "String",
      required: [true, "Password is Required"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
