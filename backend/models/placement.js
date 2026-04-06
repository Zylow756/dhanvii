import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
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
      working: String,
    },
  ],

  academic: [
    {
      qualification: String,
      stream: String,
      board: String,
      year: String,
      percentage: String,
    },
  ],

  professional: [
    {
      course: String,
      institute: String,
      duration: String,
      remark: String,
    },
  ],
  experience: [
  {
    company: String,
    post: String,
    type: String,
    from: String,
    to: String,
    salary: String
  }
]
});

const placementSchema = new mongoose.Schema({
  name: String,
  email: String,
  qualification: String,
}, { timestamps: true }); // 👈 MUST ADD

export default mongoose.model("Placement", FormSchema,placementSchema);