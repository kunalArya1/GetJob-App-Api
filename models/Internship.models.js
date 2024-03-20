import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema(
  {
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    employe: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employe" }],
    profile: String,
    skill: String,
    internshiptype: { type: String, emum: ["In office", "Remote"] },
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipendType: {
      type: String,
      emum: ["Fixed", "Performance Based", "Negotiable"],
    },
    stipendAmount: Number,
    perks: String,
    assesments: String,
  },
  { timestamps: true }
);

export default mongoose.model("Internship", InternshipSchema);
