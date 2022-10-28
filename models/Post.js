const mongoose = require("mongoose");

const post_schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title cannot be blank"],
    },
    desc: { type: String },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Comment",
      },
    ],
    // "liked by" not needed to be explicitly maintained
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", post_schema);
