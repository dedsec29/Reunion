const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const {
  registerNewUser,
  userLogin,
  getAll,
  followUser,
  unfollowUser,
  viewProfile,
} = require("../controllers/user");

// Sign Up
router.post("/signup", registerNewUser);

// Log In
router.post("/authenticate", userLogin);

// Follow
router.post("/follow/:id", auth.verifyjwt, followUser);

// Unfollow
router.post("/unfollow/:id", auth.verifyjwt, unfollowUser);

// View Profile
router.get("/", auth.verifyjwt, viewProfile);

// Get All Users (Test)
router.get("/all", getAll);

module.exports = router;
