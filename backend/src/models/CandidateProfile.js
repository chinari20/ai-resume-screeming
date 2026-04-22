import mongoose from "mongoose";

const candidateProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    fullName: String,
    phone: String,
    location: String,
    headline: String,
    summary: String,
    skills: [String],
    education: [
      {
        degree: String,
        institution: String,
        startYear: Number,
        endYear: Number,
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        years: Number,
        description: String,
      },
    ],
    certifications: [String],
    projects: [String],
    github: String,
    linkedin: String,
    totalExperienceYears: { type: Number, default: 0 },
    resumePath: String,
    parsedResume: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
  },
  { timestamps: true }
);

export default mongoose.model("CandidateProfile", candidateProfileSchema);
