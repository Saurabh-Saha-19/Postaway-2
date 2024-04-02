import mongoose, { mongo } from "mongoose";
import { ObjectId } from "mongodb";

import { postSchema } from "./post.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

const postModel = mongoose.model("Post", postSchema);
class PostRepository {
  async addPost(userId, caption, imageUrl) {
    try {
      //1. Adding the post
      const newPost = new postModel({
        caption: caption,
        imageUrl: imageUrl,
        user: userId,
      });
      const saveNewPost = await newPost.save();

      return saveNewPost;
    } catch (err) {
      throw err;
    }
  }

  async getAll() {
    try {
      const posts = await postModel.find({});
      return posts;
    } catch (err) {
      throw err;
    }
  }

  async getPostsById(postId) {
    try {
      const post = await postModel.findById(postId);
      if (!post) throw new ApplicationError("Post not found", 400);
      return post;
    } catch (err) {
      throw err;
    }
  }

  async getPostsByUserId(userId) {
    try {
      const posts = await postModel.find({
        user: new mongoose.Types.ObjectId(userId),
      });

      return posts;
    } catch (err) {
      throw err;
    }
  }

  async deletePostById(userId, postId) {
    try {
      const userPost = await postModel.find({
        _id: new mongoose.Types.ObjectId(postId),
        user: new mongoose.Types.ObjectId(userId),
      });
      if (!userPost.length)
        throw new ApplicationError(
          "Post not found or Post was not posted by you",
          400
        );
      else {
        const response = await postModel.findByIdAndDelete(postId);
        return response;
      }
    } catch (err) {
      throw err;
    }
  }

  async updatePost(userId, caption, imageUrl, postId) {
    try {
      const userPostFound = await postModel.find({
        _id: new ObjectId(postId),
        user: new ObjectId(userId),
      });

      if (!userPostFound.length)
        throw new ApplicationError(
          "You are not allowed to update this post",
          400
        );
      else {
        //1. update the post
        console.log(caption);
        userPostFound[0].caption = caption;
        userPostFound[0].imageUrl = imageUrl;
        const updatedPost = await userPostFound[0].save();
        return updatedPost;
      }
    } catch (err) {
      throw err;
    }
  }
}

export default PostRepository;
