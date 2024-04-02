import express from "express";
import jwtAuth from "../../middlewares/jwt.middleware.js";
import LikeController from "./like.controller.js";

const likeRouter = express.Router();
const likeController = new LikeController();
likeRouter.get("/toggle/:id", jwtAuth, (req, res, next) => {
  likeController.toggleLikes(req, res, next);
});

likeRouter.get("/:likeableId", jwtAuth, (req, res, next) => {
  likeController.getLikes(req, res, next);
});

export default likeRouter;
