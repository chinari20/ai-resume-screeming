import Job from "../models/Job.js";
import Application from "../models/Application.js";
import CandidateProfile from "../models/CandidateProfile.js";
import { buildJobQuery } from "../utils/apiFeatures.js";
import { scoreApplication } from "../services/scoringService.js";

export const getJobs = async (req, res, next) => {
  try {
    const filter = buildJobQuery(req.query);
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
};

export const applyToJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    const profile = await CandidateProfile.findOne({ user: req.user._id }).populate("parsedResume");

    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }
    if (!profile?.parsedResume) {
      res.status(400);
      throw new Error("Please upload a resume before applying");
    }

    const exists = await Application.findOne({ job: job._id, candidate: req.user._id });
    if (exists) {
      res.status(400);
      throw new Error("You already applied to this job");
    }

    const scoring = scoreApplication({
      job,
      resume: profile.parsedResume,
      profile,
    });

    const application = await Application.create({
      job: job._id,
      candidate: req.user._id,
      candidateProfile: profile._id,
      resume: profile.parsedResume._id,
      coverLetter: req.body.coverLetter,
      ...scoring,
    });

    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};
