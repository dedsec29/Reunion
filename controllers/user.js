const { compareSync } = require("bcrypt");
const User = require("../models/User");

// SignUp
// @route POST /api/user/signup
exports.registerNewUser = async (req, res) => {
  try {
    req.body.password = await User.hashPassword(req.body.password);
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).json({
      success: true,
      token,
      id: user._id,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// LogIn
// @route POST /api/user/authenticate
exports.userLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.json({
      success: true,
      token,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// Follow
// @route POST /api/user/follow/:id
exports.followUser = async (req, res) => {
  // req.user comes from middleware
  const user = await User.findById(req.user);
  const to_follow = await User.findById(req.params.id);
  if (!user || !to_follow) {
    return res.status(404).json({
      message: "No such user exists",
    });
  }

  if (user._id.equals(to_follow._id)) {
    return res.status(400).json({
      message: "Cannot follow oneself",
    });
  }

  // $addToSet adds only if not present
  await User.updateOne(
    { _id: user._id },
    { $addToSet: { following: to_follow._id } }
  );

  await User.updateOne(
    { _id: to_follow._id },
    { $addToSet: { followers: user._id } }
  );

  res.status(200).json({
    success: true,
    following: to_follow._id,
    followed_by: user._id,
  });
};

// Unfollow
// @route POST /api/user/unfollow/:id
exports.unfollowUser = async (req, res) => {
  // req.user comes from middleware
  const user = await User.findById(req.user);
  const to_unfollow = await User.findById(req.params.id);
  if (!user || !to_unfollow) {
    return res.status(404).json({
      message: "No such user exists",
    });
  }

  if (user._id.equals(to_unfollow._id)) {
    return res.status(400).json({
      message: "Cannot unfollow oneself",
    });
  }

  await User.updateOne(
    { _id: user._id },
    { $pull: { following: to_unfollow._id } }
  );

  await User.updateOne(
    { _id: to_unfollow._id },
    { $pull: { followers: user._id } }
  );

  res.status(200).json({
    success: true,
    unfollowed: to_unfollow._id,
    unfollowed_by: user._id,
  });
};

// Just for testing
// @route GET /api/user/all
exports.getAll = async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json({
      success: true,
      users: allUsers,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
