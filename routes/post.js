const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const { createPost, deletePost } = require("../controllers/post");

// Create Post
router.post("/", auth.verifyjwt, createPost);

// Delete Post
router.delete("/:id", auth.verifyjwt, deletePost);

module.exports = router;
