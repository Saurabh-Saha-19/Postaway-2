import mongoose from "mongoose";

const uri = `mongodb://localhost:27017/postaway`;

const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB is connected using mongoose");
  } catch (err) {
    console.log("Error while connecting to db");
    console.log(err);
  }
};

export default connectUsingMongoose;
