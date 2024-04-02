import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

const userRouter = express.Router();
const userController = new UserController();
userRouter.post("/signup", (req, res, next) => {
  userController.signUp(req, res, next);
});

userRouter.post("/signin", (req, res, next) => {
  userController.signIn(req, res, next);
});

userRouter.get("/logout", (req, res, next) => {
  userController.logout(req, res, next);
});

userRouter.get("/logout-all-devices", jwtAuth, (req, res, next) => {
  userController.logoutFromAllDevices(req, res, next);
});
export default userRouter;
