import bcrypt from "bcrypt";
import UserRepository from "./user.repository.js";

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
}

export default UserController;
