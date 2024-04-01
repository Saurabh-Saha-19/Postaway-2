import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const userModel = mongoose.model("User", userSchema);

class UserRepository {
  async findByEmail(email) {
    try {
      const response = await userModel.find({ email: email });
      return response;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }
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
