import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// const URI = "mongodb://127.0.0.1:27017/mern_admin";
const URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB Atlas Successfully Locally");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  }
};
