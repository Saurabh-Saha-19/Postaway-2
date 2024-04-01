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

          //send token to user
          return res.status(200).json({ success: true, token: token });
        } else {
          throw new ApplicationError("Invalid Credentials", 400);
        }
      }
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  }
}

export default UserController;
