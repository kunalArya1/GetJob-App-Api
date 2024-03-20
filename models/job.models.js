import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    employe: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employe" }],
    title: String,
    skill: String,
    jobtype: { type: String, emum: ["In office", "Remote", "Hybrid"] },
    opening: Number,
    description: String,
    preferences: String,
    salary: Number,
    perks: String,
    assesments: String,
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
