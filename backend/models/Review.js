import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  path: { type: String, required: true },
  qualification: { type: String, required: true },
  image: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Review", reviewSchema);