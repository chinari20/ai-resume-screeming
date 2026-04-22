import CandidateProfile from "../models/CandidateProfile.js";
import Resume from "../models/Resume.js";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { parseResumeFile } from "../services/resumeParserService.js";

export const getCandidateProfile = async (req, res, next) => {
  try {
    const profile = await CandidateProfile.findOne({ user: req.user._id }).populate("parsedResume");
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const upsertCandidateProfile = async (req, res, next) => {
  try {
    const payload = { ...req.body, user: req.user._id };
    const profile = await CandidateProfile.findOneAndUpdate(
      { user: req.user._id },
      payload,
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("Resume file is required");
    }

    const parsed = await parseResumeFile(req.file);
    const resume = await Resume.create({
      candidate: req.user._id,
      fileName: req.file.originalname,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      ...parsed,
    });

    const profile = await CandidateProfile.findOneAndUpdate(
      { user: req.user._id },
      {
        user: req.user._id,
        fullName: parsed.extractedName,
        phone: parsed.extractedPhone,
        skills: parsed.extractedSkills,
        totalExperienceYears: parsed.extractedExperienceYears,
        resumePath: req.file.path,
        parsedResume: resume._id,
      },
      { new: true, upsert: true }
    );

    res.status(201).json({ resume, profile });
  } catch (error) {
    next(error);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ candidate: req.user._id })
      .populate("job")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

export const getRecommendedJobs = async (req, res, next) => {
  try {
    const profile = await CandidateProfile.findOne({ user: req.user._id });
    const skills = profile?.skills || [];
    const jobs = await Job.find({
      status: "open",
      requiredSkills: { $in: skills.map((skill) => new RegExp(skill, "i")) },
    })
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};
