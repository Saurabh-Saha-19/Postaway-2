import express from "express";
import postRouter from "./src/features/post/post.routes.js";
import bodyParser from "body-parser";

const server = express();

server.use(bodyParser.json());
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send("Response successfully generated");
});

export default server;
