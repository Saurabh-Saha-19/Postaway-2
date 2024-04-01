import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

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

  async fetchToken(token, email) {
    try {
      const found = await this.findByEmail(email);
      // console.log(found);
      const result = found[0].token.find((t) => {
        return token === t;
      });

      if (!result) {
        return false;
      } else return true;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async pushToken(token, userId) {
    try {
      const user = await userModel.findById(userId);
      user.token.push(token);
      await user.save();
      return;
    } catch (err) {
      throw new ApplicationError("Unable to save token right now", 400);
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

  async deleteAllTokens(userId) {
    try {
      const user = await userModel.findById(userId);
      // console.log(userId);
      user.token = [];
      await user.save();
    } catch (err) {
      throw err;
    }
  }
}

export default UserRepository;
