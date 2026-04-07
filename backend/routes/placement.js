import express from "express";
import Placement from "../models/placement.js";

const router = express.Router();

// SAVE DATA
router.post("/add", async (req, res) => {
  try {
    console.log("BODY:", req.body); 

    const newData = new Placement(req.body);
    await newData.save();

    res.json({ message: "Form saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving data" });
  }
});

// GET DATA
router.get("/all", async (req, res) => {
  try {
    const data = await Placement.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" +error});
  }
});

// DELETE DATA
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Placement.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Error deleting data" });
  }
});

export default router;