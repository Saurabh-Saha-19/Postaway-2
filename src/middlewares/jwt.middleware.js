import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { userSchema } from "../features/user/user.schema.js";
import UserRepository from "../features/user/user.repository.js";

const userModel = mongoose.model("User", userSchema);
const userRepo = new UserRepository();
const jwtAuth = async (req, res, next) => {
  //1. Read the token from authorization header
  const { jwtToken, email } = req.cookies;

  try {
    //2. check for the token
    if (!jwtToken || !(await userRepo.fetchToken(jwtToken, email))) {
      return res.status(401).send("Unauthorized, Please re-login");
    }
    //3. check if token is valid.
    const payload = jwt.verify(jwtToken, "SaurabhSaha");
    req.userId = payload.userId;
  } catch (err) {
    //4. return error, if any
    console.log(err.message);
    return res.status(401).send("Unauthorized");
  }
  //5. call the next middleware
  next();
};

export default jwtAuth;
