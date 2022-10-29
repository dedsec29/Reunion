const mongoose = require("mongoose");

const post_schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title cannot be blank"],
    },
    description: { type: String },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Comment",
      },
    ],
    liked_by: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", post_schema);
