const Post = require("../models/Post");

// Create Post
// @route POST /api/posts/
exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json({
      success: true,
      Post_ID: post._id,
      Title: post.title,
      Description: post.description,
      Created_Time: post.createdAt, // already in UTC
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// Delete Post
// @route DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({
        message: "Post does not exist",
      });
    } else {
      res.status(200).json({
        message: "Post has been deleted",
        data: post,
      });
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// Like Post
// @route POST /api/posts/like/:id
exports.likePost = async (req, res) => {
  try {
    await Post.updateOne(
      { _id: req.params.id },
      { $addToSet: { liked_by: req.user._id } }
    );

    res.status(200).json({
      success: true,
      message: "Post liked",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// Unlike Post
// @route POST /api/posts/unlike/:id
exports.unlikePost = async (req, res) => {
  try {
    await Post.updateOne(
      { _id: req.params.id },
      { $pull: { liked_by: req.user._id } }
    );

    res.status(200).json({
      success: true,
      message: "Post unliked",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
