import mongoose from "mongoose";
import commentSchema from "./comment.schema.js";
import { ObjectId } from "mongodb";
import { postSchema } from "../post/post.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

const commentModel = mongoose.model("Comment", commentSchema);
const postModel = mongoose.model("Post", postSchema);

export default class CommentRepository {
  async addComment(userId, content, postId) {
    try {
      const post = await postModel.findById(postId);
      if (!post) throw new ApplicationError("Post not found", 400);

      const comment = new commentModel({
        content: content,
        user: new ObjectId(userId),
        post: new ObjectId(postId),
      });

      const saveComment = await comment.save();
      post.comments.push(saveComment._id);
      await post.save();
      return saveComment;
    } catch (err) {
      throw err;
    }
  }

  async getComments(postId) {
    try {
      const comments = await commentModel
        .find({ post: postId })
        .populate("user");

      console.log(comments);
      if (!comments.length) throw new ApplicationError("Post not found", 400);
      const response = await commentModel.aggregate([
        {
          $match: { post: new ObjectId(postId) },
        },
        {
          $project: { _id: 0, content: 1, user: 1 },
        },
      ]);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async deleteComment(commentId, userId) {
    try {
      const comment = await commentModel.findById(commentId);
      if (!comment) throw new ApplicationError("Comment not found", 400);
      if (comment.user.toString() != userId)
        throw new ApplicationError(
          "You are not allowed to delete this comment",
          400
        );

      await postModel.findOneAndUpdate(
        { comments: new ObjectId(commentId) },
        {
          $pull: { comments: commentId },
        }
      );
      const response = await commentModel.findByIdAndDelete(commentId);

      return response;
    } catch (err) {
      throw err;
    }
  }

  async updateComment(commentId, userId, content) {
    try {
      const comment = await commentModel.findById(commentId);
      if (!comment) throw new ApplicationError("Comment not found", 400);
      if (comment.user.toString() != userId)
        throw new ApplicationError(
          "You are not allowed to delete this comment",
          400
        );

      const response = await commentModel.findByIdAndUpdate(commentId, {
        content: content,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
}
