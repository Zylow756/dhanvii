import upload from "../middleware/upload.js";
import express from "express";

const router = express.Router();
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const review = new review({
      name: req.body.name,
      message: req.body.message,
      path:req.body.path,
      image: req.file ? req.file.filename : "", 
    });

    await review.save();

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});