import mongoose, { ConnectOptions } from "mongoose";
let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Database is already connected");
    return;
  }

  const db = await mongoose.connect(String(process.env.MONGODB_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
  isConnected = true;
  console.log("Using new DB connection");
};
