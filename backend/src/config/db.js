import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MongoDB URI is missing");

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
};
