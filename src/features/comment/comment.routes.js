import express from "express";
import CommentController from "./comment.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.get("/:postId", jwtAuth, (req, res, next) => {
  commentController.getComments(req, res, next);
});
commentRouter.post("/:postId", jwtAuth, (req, res, next) => {
  commentController.addComment(req, res, next);
});
commentRouter.delete("/:commentId", jwtAuth, (req, res, next) => {
  commentController.deleteComment(req, res, next);
});
commentRouter.put("/:commentId", jwtAuth, (req, res, next) => {
  commentController.updateComment(req, res, next);
});

export default commentRouter;
