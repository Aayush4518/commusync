import mongoose from "mongoose";

export const connectDB= async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI as string)     //string because the environment variable is a string

    console.log("MongoDB connected successfully");

  }
  catch(err){
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);              // Exit the process with an error code
  }
}

