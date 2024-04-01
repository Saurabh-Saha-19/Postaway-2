import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export { postSchema };
