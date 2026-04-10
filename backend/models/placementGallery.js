import mongoose from "mongoose";

const placementGallerySchema = new mongoose.Schema({
  name: String,
  qualification: String,
  company: String,
  salary: Number,
  photo: String,
  background: {
  type: String
}
});

export default mongoose.model("PlacementGallery", placementGallerySchema);