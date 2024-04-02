import PostRepository from "./post.repository.js";

export default class PostController {
  constructor() {
    this.postRepo = new PostRepository();
  }

  async getAllPosts(req, res, next) {
    try {
      const posts = await this.postRepo.getAll();
      return res.status(200).send({ success: true, posts: posts });
    } catch (err) {
      next(err);
    }
  }

  async getPostById(req, res, next) {
    try {
      const postId = req.params.postId;
      const post = await this.postRepo.getPostsById(postId);
      return res.status(200).json({ success: true, post: post });
    } catch (err) {
      next(err);
    }
  }

  async getPostByUserId(req, res, next) {
    try {
      const userId = req.userId;
      const post = await this.postRepo.getPostsByUserId(userId);
      return res.status(200).json({ success: true, posts: post });
    } catch (err) {
      next(err);
    }
  }

  async addPost(req, res, next) {
    try {
      const { caption } = req.body;
      console.log(caption);
      const response = await this.postRepo.addPost(
        req.userId,
        caption,
        req.file.filename
      );
      console.log(response);
      if (response) {
        res.status(201).send({
          success: true,
          message: "Post added successfully!",
          response,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async deletePost(req, res, next) {
    try {
      const postId = req.params.postId;
      const userId = req.userId;
      const response = await this.postRepo.deletePostById(userId, postId);
      return res.status(200).json({
        success: true,
        message: "Post deleted successfully",
        response,
      });
    } catch (err) {
      next(err);
    }
  }

  async updatePost(req, res, next) {
    try {
      const postId = req.params.postId;
      const userId = req.userId;
      const caption = req.body.caption;
      const imageUrl = req.file.filename;
      console.log(caption);
      const response = await this.postRepo.updatePost(
        userId,
        caption,
        imageUrl,
        postId
      );
      return res.status(200).json({
        success: true,
        message: "Post updated successfully",
        response,
      });
    } catch (err) {
      next(err);
    }
  }
}
