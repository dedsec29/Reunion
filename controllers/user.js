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
