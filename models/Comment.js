const mongoose = require("mongoose");

const comment_schema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Cannot post a blank comment"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", comment_schema);
