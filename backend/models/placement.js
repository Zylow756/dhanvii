import { Schema, model } from "mongoose";

const placementSchema = new Schema({
  name: String,
  address: String,
  mobile: String,
  dob: String,
  gender: String,
  language: String,
  jobTitle: String,
  expectedSalary: String,
  jobLocation: String,

  family: [
    {
      relation: String,
      name: String,
      education: String,
      working: String
    }
  ],

  academic: [
    {
      qualification: String,
      stream: String,
      board: String,
      year: String,
      percentage: String
    }
  ],

  professional: [
    {
      course: String,
      institute: String,
      duration: String,
      remark: String
    }
  ],

  experience: [
  {
    company: { type: String, default: "" },
    post: { type: String, default: "" },
    type: { type: String, default: "" },
    from: { type: String, default: "" },
    to: { type: String, default: "" },
    salary: { type: String, default: "" }
  }
],
}, { timestamps: true });


export default model("Placement", placementSchema);