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
        success: true,
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

// View Post
// @route GET /api/posts/:id
exports.viewPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("comments");
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post does not exist",
      });
    }

    res.status(200).json({
      success: true,
      number_of_likes: post.liked_by.length,
      number_of_comments: post.comments.length,
      comments: post.comments,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// View All Posts
// @route GET /api/posts/
exports.getAllPosts = async (req, res) => {
  try {
    let posts = await Post.find()
      .populate("comments", "content")
      .sort({ createdAt: 1 });

    let all_posts = [];
    for (let i of posts) {
      let post = {};
      post["id"] = i._id;
      post["title"] = i.title;
      post["desc"] = i.description;
      post["created_at"] = i.createdAt;
      post["comments"] = i.comments;
      post["likes"] = i.liked_by.length;
      all_posts.push(post);
    }

    res.status(200).json({
      success: true,
      all_posts,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
