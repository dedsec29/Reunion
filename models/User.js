const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const user_schema = mongoose.Schema(
  {
    user_name: {
      type: String,
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

user_schema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, process.env.TOKEN_SECRET);

  await user.save();

  return token;
};

// To find the user by email and password from the database and send it back
user_schema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const is_match = await bcrypt.compare(password, user.password);

  if (!is_match) {
    throw new Error("Unable to login");
  }

  return user;
};

user_schema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 8);
};

module.exports = mongoose.model("User", user_schema);
