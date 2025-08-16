import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("Mongo URI missing!");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

// Optional: log disconnections/reconnections
mongoose.connection.on("disconnected", () => console.log("⚠️ MongoDB disconnected"));
mongoose.connection.on("reconnected", () => console.log("🔄 MongoDB reconnected"));

export default connectDB;
