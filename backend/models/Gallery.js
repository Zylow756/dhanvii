import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["function", "institute", "certification"],
    },
    description: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);