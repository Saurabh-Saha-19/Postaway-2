import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserController {
  constructor() {
    this.userRepo = new UserRepository();
  }

  async signUp(req, res, next) {
    const { name, email, password, gender } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      //   console.log(hashedPassword);
      const userData = { name, email, password: hashedPassword, gender };
      const response = await this.userRepo.signUp(userData);
      res.status(201).send(response);
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await this.userRepo.findByEmail(email);
      //   console.log(user);
      if (user.length == 0) {
        throw new ApplicationError("Email Id not registered !", 400);
      } else {
        // compare password with hashed password in the db.
        const result = await bcrypt.compare(password, user[0].password);

        //create a token for user
        if (result) {
          const token = jwt.sign(
            {
              userId: user[0]._id,
              email: user[0].email,
            },
            "SaurabhSaha",
            {
              expiresIn: "4h",
            }
          );

          await this.userRepo.pushToken(token, user[0]._id);

          //send token to user using a cookie
          res.cookie("jwtToken", token, {
            maxAge: 5 * 60 * 60 * 1000,
            httpOnly: true,
          });
          res.cookie("email", user[0].email, {
            maxAge: 5 * 60 * 60 * 1000,
            httpOnly: true,
          });
          return res
            .status(200)
            .json({ success: true, message: "User logged in successfully" });
        } else {
          throw new ApplicationError("Invalid Credentials", 400);
        }
      }
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  }

  logout(req, res, next) {
    res
      .clearCookie("jwtToken")
      .json({ success: true, message: "User logged out successfully" });
  }

  async logoutFromAllDevices(req, res, next) {
    try {
      const userId = req.userId;
      // console.log(userId);
      await this.userRepo.deleteAllTokens(userId);
      this.logout(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
