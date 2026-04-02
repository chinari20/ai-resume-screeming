import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recruiterProfile: { type: mongoose.Schema.Types.ObjectId, ref: "RecruiterProfile" },
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, default: "Full-time" },
    salaryRange: String,
    requiredSkills: [String],
    preferredSkills: [String],
    minimumExperience: { type: Number, default: 0 },
    educationRequirement: String,
    jobDescription: { type: String, required: true },
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
