const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const { addComment } = require("../controllers/comment");

// Add Comment
router.post("/:id", auth.verifyjwt, addComment);

module.exports = router;
