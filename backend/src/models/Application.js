import mongoose from "mongoose";
import { APPLICATION_STATUSES } from "../utils/constants.js";

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    candidateProfile: { type: mongoose.Schema.Types.ObjectId, ref: "CandidateProfile" },
    resume: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
    coverLetter: String,
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: "applied",
    },
    score: { type: Number, default: 0 },
    scoreBreakdown: {
      skillsScore: { type: Number, default: 0 },
      experienceScore: { type: Number, default: 0 },
      educationScore: { type: Number, default: 0 },
      keywordScore: { type: Number, default: 0 },
    },
    matchedSkills: [String],
    missingSkills: [String],
    strengths: [String],
    summary: String,
    recommendation: String,
    interviewDate: Date,
    recruiterNotes: String,
  },
  { timestamps: true }
);

applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });

export default mongoose.model("Application", applicationSchema);
