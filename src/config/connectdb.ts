import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
   const mongouri = process.env.MONGODB_URI
    if (!mongouri) {
      throw new Error("MONGODB_URI is not defined in the environment variables");
    }
    await mongoose.connect(mongouri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
}