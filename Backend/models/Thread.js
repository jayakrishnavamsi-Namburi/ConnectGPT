// models/Thread.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
}, { timestamps: true });

const threadSchema = new mongoose.Schema({
  threadId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  messages: [messageSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // 🔗 link to User
}, { timestamps: true });

export default mongoose.model("Thread", threadSchema);
