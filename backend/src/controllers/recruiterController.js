import Job from "../models/Job.js";
import Application from "../models/Application.js";
import RecruiterProfile from "../models/RecruiterProfile.js";
import CandidateProfile from "../models/CandidateProfile.js";
import Resume from "../models/Resume.js";
import { scoreApplication } from "../services/scoringService.js";

export const getRecruiterProfile = async (req, res, next) => {
  try {
    const profile = await RecruiterProfile.findOne({ user: req.user._id });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const upsertRecruiterProfile = async (req, res, next) => {
  try {
    const profile = await RecruiterProfile.findOneAndUpdate(
      { user: req.user._id },
      { ...req.body, user: req.user._id },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const recruiterProfile = await RecruiterProfile.findOne({ user: req.user._id });
    const job = await Job.create({
      ...req.body,
      recruiter: req.user._id,
      recruiterProfile: recruiterProfile?._id,
      companyName: req.body.companyName || recruiterProfile?.companyName || "Company",
    });
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, recruiter: req.user._id },
      req.body,
      { new: true }
    );
    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, recruiter: req.user._id });
    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }
    res.json({ message: "Job deleted" });
  } catch (error) {
    next(error);
  }
};

export const getRecruiterJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ recruiter: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

export const getJobApplicants = async (req, res, next) => {
  try {
    const applications = await Application.find({ job: req.params.id })
      .populate("candidate", "name email")
      .populate("candidateProfile")
      .populate("resume")
      .sort({ score: -1, createdAt: -1 });
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

export const runScreeningForJob = async (req, res, next) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, recruiter: req.user._id });
    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }

    const applications = await Application.find({ job: job._id });
    const updated = [];

    for (const application of applications) {
      const [profile, resume] = await Promise.all([
        CandidateProfile.findById(application.candidateProfile),
        Resume.findById(application.resume),
      ]);

      const scoring = scoreApplication({ job, resume, profile });
      Object.assign(application, scoring, {
        status: application.status === "applied" ? "under review" : application.status,
      });
      await application.save();
      updated.push(application);
    }

    updated.sort((a, b) => b.score - a.score);
    res.json({
      message: "Screening complete",
      topCandidates: updated.slice(0, 5),
      applications: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id).populate("job");
    if (!application) {
      res.status(404);
      throw new Error("Application not found");
    }
    if (String(application.job.recruiter) !== String(req.user._id)) {
      res.status(403);
      throw new Error("Forbidden");
    }
    application.status = req.body.status || application.status;
    application.recruiterNotes = req.body.recruiterNotes ?? application.recruiterNotes;
    application.interviewDate = req.body.interviewDate ?? application.interviewDate;
    await application.save();
    res.json(application);
  } catch (error) {
    next(error);
  }
};
