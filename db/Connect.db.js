import mongoose from "mongoose";

const connectDB = async (MongoDB_URL) => {
  await mongoose
    .connect(MongoDB_URL)
    .then(console.log("Database Connected Succefully"));
};

export default connectDB;
