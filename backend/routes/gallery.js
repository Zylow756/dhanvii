import express from "express";
import multer from "multer";
import Gallery from "../models/Gallery.js";
import fs from "fs";
import sharp from "sharp";
import path from "path";

const router = express.Router();

// STORAGE CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


// COMMON IMAGE PROCESS FUNCTION
const processImage = async (inputPath, outputPath) => {
  await sharp(inputPath)
    .rotate()
    .resize(1920, 1080, {
      fit: "inside", // no crop, maintain ratio
      withoutEnlargement: true, // don't upscale small images
    })
    .webp({ quality: 85 }) // better than jpeg
    .toFile(outputPath);
};


// UPLOAD IMAGE
router.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "No files uploaded" });
    }

    const { category, description } = req.body;

    if (!category) {
      return res.status(400).json({ msg: "Category missing" });
    }

    const imagesData = [];

    for (const file of req.files) {
      const newFileName = "img-" + Date.now() + ".webp";
      const outputPath = path.join("uploads", newFileName);

      await processImage(file.path, outputPath);

      // delete original file safely
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      imagesData.push({
        image: newFileName,
        category,
        description,
      });
    }

    await Gallery.insertMany(imagesData);

    res.json({ msg: "Uploaded in 1080p successfully" });
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


// DELETE IMAGE
router.delete("/:id", async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) return res.status(404).json({ msg: "Not found" });

    const filePath = path.join("uploads", image.image);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE IMAGE
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const imageDoc = await Gallery.findById(req.params.id);
    if (!imageDoc) {
      return res.status(404).json({ message: "Image not found" });
    }

    let updatedData = {
      description: req.body.description,
      category: req.body.category,
    };

    if (req.file) {
      const newFileName = "img-" + Date.now() + ".webp";
      const outputPath = path.join("uploads", newFileName);

      await processImage(req.file.path, outputPath);

      // delete old image
      const oldPath = path.join("uploads", imageDoc.image);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      updatedData.image = newFileName;
    }

    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { returnDocument: "after", runValidators: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;