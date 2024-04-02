import express from "express";
import postRouter from "./src/features/post/post.routes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import userRouter from "./src/features/user/user.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import likeRouter from "./src/features/like/like.routes.js";

const server = express();

server.use(bodyParser.json());
server.use(cookieParser());
server.use(express.static("public"));
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);
server.use("/api/comments", commentRouter);
server.use("/api/likes", likeRouter);

server.get("/", (req, res) => {
  res.send("Response successfully generated");
});

//Error hanler middleware
server.use((err, req, res, next) => {
  console.log(err.message);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err instanceof ApplicationError) {
    return res.status(err.code).json({ success: false, message: err.message });
  }

  res.status(500).json({ success: false, message: "Something went wrong" });
});

export default server;
