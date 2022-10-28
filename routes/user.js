const express = require("express");
const router = express.Router();

const { registerNewUser, userLogin, getAll } = require("../controllers/user");

// Sign Up
router.post("/signup", registerNewUser);

// Log In
router.post("/authenticate", userLogin);

// Get All Users (Test)
router.get("/all", getAll);

module.exports = router;
