import mongoose from "mongoose";

const recruiterProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    companyName: { type: String, required: true },
    companyWebsite: String,
    companySize: String,
    industry: String,
    location: String,
    about: String,
  },
  { timestamps: true }
);

export default mongoose.model("RecruiterProfile", recruiterProfileSchema);
