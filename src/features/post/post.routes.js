import express from "express";
import uploadFile from "../../middlewares/fileUpload.middleware.js";
import PostController from "./post.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

const postRouter = express.Router();
const postController = new PostController();

postRouter.get("/all", jwtAuth, (req, res, next) => {
  postController.getAllPosts(req, res, next);
});

postRouter.get("/:postId", jwtAuth, (req, res, next) => {
  postController.getPostById(req, res, next);
});

postRouter.get("/", jwtAuth, (req, res, next) => {
  postController.getPostByUserId(req, res, next);
});

postRouter.post(
  "/",
  jwtAuth,
  uploadFile.single("imageUrl"),
  (req, res, next) => {
    postController.addPost(req, res, next);
  }
);

postRouter.delete("/:postId", jwtAuth, (req, res, next) => {
  postController.deletePost(req, res, next);
});

postRouter.put(
  "/:postId",
  jwtAuth,
  uploadFile.single("imageUrl"),
  (req, res, next) => {
    postController.updatePost(req, res, next);
  }
);

export default postRouter;
