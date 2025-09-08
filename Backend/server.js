import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes);

// Start server only after DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on PORT ${PORT}`);
      connectDB();
    });



// Connect DB first, then start server
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected with Database");
  } catch (err) {
    console.error("❌ Failed to connect DB:", err.message);
    process.exit(1); // stop the app if DB connection fails
  }
};

