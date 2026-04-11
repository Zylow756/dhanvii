import express from "express";
import multer from "multer";
import Gallery from "../models/Gallery.js";
import fs from "fs";
import sharp from "sharp";

const router = express.Router();

// STORAGE CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


// UPLOAD IMAGE
router.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
    console.log("FILES:", req.files);
    console.log("BODY:", req.body);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "No files uploaded" });
    }

    const category = req.body.category;

    if (!category) {
      return res.status(400).json({ msg: "Category missing" });
    }

    const compressedImages = [];

    for (const file of req.files) {
      const newFileName = "compressed-" + file.filename;

      await sharp(file.path)
        .resize(800)
        .jpeg({ quality: 70 })
        .toFile(`uploads/${newFileName}`);

      fs.unlinkSync(file.path);

      compressedImages.push({
        image: newFileName,
        category: category,
      });
    }

    await Gallery.insertMany(compressedImages);

    res.json({ msg: "Uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// GET ALL IMAGES
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) filter.category = category;

    const images = await Gallery.find(filter).sort({ createdAt: -1 });

    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE IMAGE
router.delete("/:id", async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) return res.status(404).json({ msg: "Not found" });

    // delete file from folder
    fs.unlinkSync(`uploads/${image.image}`);

    // delete from DB
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;