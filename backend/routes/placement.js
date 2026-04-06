import express from "express";
import Placement from "../models/placement.js";

const router = express.Router();

// Save placement form
router.post("/add", async (req, res) => {
  try {
  console.log("Incoming Data:", req.body);
    const newData = new Placement(req.body);
    await newData.save();

console.log("Saved Successfully ");
    res.status(201).json({
  success: true,
  message: "Placement data saved successfully",
      data: newData
});
  } catch (err) {
    console.log("SAVE ERROR:",err);
    res.status(500).json({ error: err.message,
      err: err.errors  });
  }
});

// Get all placement data
router.get("/", async (req, res) => {
  try {
    const data = await Placement.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;