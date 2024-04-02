import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import likeSchema from "./like.schema.js";
import { postSchema } from "../post/post.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import commentSchema from "../comment/comment.schema.js";

const likeModel = mongoose.model("Like", likeSchema);
const postModel = mongoose.model("Post", postSchema);
const commentModel = mongoose.model("Comment", commentSchema);
export default class LikeRepository {
  async getLikes(likeableId) {
    try {
      const likeable = await likeModel.find({ likeable: likeableId }).populate({
        path: "user",
        select: "name email ",
      });
      if (!likeable.length) {
        throw new ApplicationError("No Likes found", 400);
      }

      return likeable;
    } catch (err) {
      throw err;
    }
  }
  async toggle(userId, type, id) {
    try {
      if (type === "Post") {
        const post = await postModel.findById(id);
        if (!post) throw new ApplicationError("Post not found", 400);

        const liked = await likeModel.findOne({
          user: userId,
          likeable: id,
          on_model: "Post",
        });

        if (!liked) {
          const newLike = new likeModel({
            user: userId,
            likeable: id,
            on_model: "Post",
          });
          const saveNewLike = await newLike.save();

          post.likes.push(saveNewLike._id);
          await post.save();
          return { likeStatus: "liked", response: saveNewLike };
        } else {
          //means the user has already liked the post.
          const likeId = liked._id;
          await postModel.findOneAndUpdate(
            { _id: new ObjectId(id), likes: likeId },
            { $pull: { likes: likeId } }
          );

          const response = await likeModel.findByIdAndDelete(likeId);
          return { likeStatus: "unliked", response: response };
        }
      } else if (type === "Comment") {
        const comment = await commentModel.findById(id);
        if (!comment) throw new ApplicationError("Comment not found", 400);

        const liked = await likeModel.findOne({
          user: userId,
          likeable: id,
          on_model: "Comment",
        });

        if (!liked) {
          const newLike = new likeModel({
            user: userId,
            likeable: id,
            on_model: "Comment",
          });
          const saveNewLike = await newLike.save();

          comment.likes.push(saveNewLike._id);
          await comment.save();
          return { likeStatus: "liked", response: saveNewLike };
        } else {
          //means the user has already liked the post.
          const likeId = liked._id;
          await commentModel.findOneAndUpdate(
            { _id: new ObjectId(id), likes: likeId },
            { $pull: { likes: likeId } }
          );

          const response = await likeModel.findByIdAndDelete(likeId);
          return { likeStatus: "unliked", response: response };
        }
      } else {
        throw new ApplicationError("The type mentioned is not defined", 400);
      }
    } catch (err) {
      throw err;
    }
  }
}
