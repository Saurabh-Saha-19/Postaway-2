import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import { postSchema } from "./post.schema.js";

const postModel = mongoose.model("Post", postSchema);
class PostRepository {
  async addPost(postData) {
    try {
      //1. Adding the post
      postData.user = new ObjectId(postData.user);
      const newPost = new postModel(postData);
      const saveNewPost = await newPost.save();

      return saveNewPost;
    } catch (err) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }
}

export default PostRepository;
