const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

let auth = {
  verifyjwt: async (req, res, next) => {
    try {
      const token = req.header("auth-token");
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findById(decoded._id);

      if (!user) {
        res.status(401).send({
          message: "Please Authenticate",
        });
      }

      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};

module.exports = auth;
