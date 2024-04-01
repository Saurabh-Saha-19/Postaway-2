import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const userModel = mongoose.model("User", userSchema);

class UserRepository {
  async signUp(userData) {
    try {
      const newUser = new userModel(userData);
      const saveNewUser = await newUser.save();
      return saveNewUser;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }
}

export default UserRepository;
