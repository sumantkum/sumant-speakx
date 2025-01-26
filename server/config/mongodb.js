import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {

    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/speakx";
    console.log("Connecting to MongoDB...");

    // Connect to MongoDB
    const conn = await mongoose.connect(mongoUri, {
    
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } 
  catch (error) {
    console.error("MongoDB Connection Error:", error);
    if (error.name === 'MongoNetworkError') {
      console.log("Check if MongoDB is running on the specified host and port.");
    }
    process.exit(1);
  }
};

export default connectDB;