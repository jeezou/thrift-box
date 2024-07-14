import { Nitro } from "nitropack";
import mongoose from "mongoose";

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();

  try {
    await mongoose.connect(config.mongodbURI);
    console.log("Successfully connected to MongoDB");
  } catch (e) {
    console.error("MongoDB connection error: ", e);
  }
};