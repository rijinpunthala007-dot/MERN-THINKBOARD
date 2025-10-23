import mongoose from "mongoose";
import 'dotenv/config'; // <-- 1. Import this to load .env variables

const connectDB = async () => {
  try {
    // 2. Pass the connection string to mongoose.connect
    await mongoose.connect(process.env.MONGO_URI); 

    console.log("Connected to MongoDB"); // This will now run
  } catch (error) {
    console.log("Error connecting to MONGODB", error);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB; // <-- 3. Make sure to export the function