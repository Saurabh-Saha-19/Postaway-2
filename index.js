import express from "express";
import postRouter from "./src/features/post/post.routes.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import userRouter from "./src/features/user/user.routes.js";

const server = express();

server.use(bodyParser.json());
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

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
