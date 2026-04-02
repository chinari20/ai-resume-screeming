import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileName: String,
    filePath: String,
    mimeType: String,
    extractedText: String,
    extractedName: String,
    extractedEmail: String,
    extractedPhone: String,
    extractedSkills: [String],
    extractedEducation: [String],
    extractedExperienceYears: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
