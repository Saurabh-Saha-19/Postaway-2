import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
});

export default commentSchema;
