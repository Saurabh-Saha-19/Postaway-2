import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "on_model",
  },
  on_model: {
    type: String,
    enum: ["Post", "Comment"],
  },
});

export default likeSchema;
