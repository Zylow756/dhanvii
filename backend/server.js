import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

//  Correct MongoDB connection
/*mongoose.connect("mongodb://127.0.0.1:27017/placement", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});*/
mongoose.connect("mongodb://127.0.0.1:27017/placement")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

const FormSchema = new mongoose.Schema({}, { strict: false });
const Form = mongoose.model("Form", FormSchema);

//  API
app.post("/api/form", async (req, res) => {
  console.log("Incoming Data:", req.body);
  try {
    const newForm = new Form(req.body);
    await newForm.save();

console.log("Saved in DB ");
    res.json({ message: "Saved to DB" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving data "});
  }
});

//  Test route
app.get("/", (req, res) => {
  res.send("Server running...");
});

//  Start server (IMPORTANT)
app.listen(5000, () => {
  console.log("Server running on port 5000");
});