const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const {
  createPost,
  deletePost,
  likePost,
  unlikePost,
} = require("../controllers/post");

// Create Post
router.post("/", auth.verifyjwt, createPost);

// Delete Post
router.delete("/:id", auth.verifyjwt, deletePost);

// Like Post
router.post("/like/:id", auth.verifyjwt, likePost);

// Unlike Post
router.post("/unlike/:id", auth.verifyjwt, unlikePost);

module.exports = router;
