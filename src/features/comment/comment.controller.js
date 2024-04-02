import CommentRepository from "./comment.repository.js";

export default class CommentController {
  constructor() {
    this.commentRepo = new CommentRepository();
  }

  async getComments(req, res, next) {
    try {
      const postId = req.params.postId;
      const response = await this.commentRepo.getComments(postId);
      return res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  }

  async addComment(req, res, next) {
    const userId = req.userId;
    const content = req.body.content;
    const postId = req.params.postId;
    try {
      const response = await this.commentRepo.addComment(
        userId,
        content,
        postId
      );

      return res.status(201).json({ success: true, comment: response });
    } catch (err) {
      next(err);
    }
  }

  async deleteComment(req, res, next) {
    const userId = req.userId;
    const commentId = req.params.commentId;

    try {
      const response = await this.commentRepo.deleteComment(commentId, userId);
      return res.status(200).json({ success: true, response });
    } catch (err) {
      next(err);
    }
  }

  async updateComment(req, res, next) {
    const userId = req.userId;
    const commentId = req.params.commentId;
    const content = req.body.content;

    try {
      const response = await this.commentRepo.updateComment(
        commentId,
        userId,
        content
      );

      return res.status(200).json({ success: true, previousComment: response });
    } catch (err) {
      throw err;
    }
  }
}
