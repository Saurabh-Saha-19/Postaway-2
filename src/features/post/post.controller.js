import PostRepository from "./post.repository.js";

export default class PostController {
  constructor() {
    this.postRepo = new PostRepository();
  }

  async addPost(req, res) {
    try {
      const postData = {
        caption: req.body.caption,
        imageUrl: req.file.filename,
        user: req.userID,
      };
      const response = await this.postRepo.addPost(postData);
      if (response.success) {
        res.status(201).send({ message: "Post added successfully!", response });
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}
