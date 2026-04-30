import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  youtubeUrl: String,
}, { timestamps: true });

export default mongoose.model("Video", videoSchema);