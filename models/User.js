const mongoose = require("mongoose");
const validator = require("validator");

const user_schema = mongoose.Schema(
  {
    user_name: {
      type: String,
      required: [true, "Please provide a user name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already taken"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", user_schema);
