const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Add Comment
// @route POST /api/comment/:id
exports.addComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    // Cannot pass param to pre save hook without using some 3rd party library
    await Post.updateOne(
      { _id: req.params.id },
      { $push: { comments: comment._id } }
    );
    res.status(201).json({
      success: true,
      message: "Comment successfully added",
      Comment_ID: comment._id,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
