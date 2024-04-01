import express from "express";
import uploadFile from "../../middlewares/fileUpload.middleware.js";
import PostController from "./post.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

const postRouter = express.Router();
const postController = new PostController();

postRouter.get("/");
postRouter.post("/", jwtAuth, uploadFile.single("imageUrl"), (req, res) => {
  postController.addPost(req, res);
});

export default postRouter;
