/* global process */
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import placementRoutes from "./routes/placement.js";
import enquiryRoutes from "./routes/enquiry.js";

const app = express();
dotenv.config({ path: "./.env" });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/placement", placementRoutes);
app.use("/api/enquiry", enquiryRoutes);

  mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log("Error:", err));

  const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port ${PORT}");
});

/*const FormSchema = new mongoose.Schema({}, { strict: false });
const Form = mongoose.model("Form", FormSchema);

//  API
app.post("/api/form", async (req, res) => {
  console.log("Incoming Data:", req.body);
  try {
    const newForm = new Form(req.body);
    await newForm.save();

console.log("Saved Successfully ");
    res.json({ message: "Saved to DB" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
  message: err.message || "Error saving data",
});
  }
});*/

//  Test route
app.get("/", (req, res) => {
  res.send("Server running...");
});

