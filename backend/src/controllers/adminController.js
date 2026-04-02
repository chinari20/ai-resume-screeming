import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import CandidateProfile from "../models/CandidateProfile.js";
import RecruiterProfile from "../models/RecruiterProfile.js";

export const getAdminDashboard = async (req, res, next) => {
  try {
    const [users, jobs, applications, candidates, recruiters, recentApplications] = await Promise.all([
      User.countDocuments(),
      Job.countDocuments(),
      Application.countDocuments(),
      CandidateProfile.countDocuments(),
      RecruiterProfile.countDocuments(),
      Application.find()
        .populate("candidate", "name email")
        .populate("job", "title companyName")
        .sort({ createdAt: -1 })
        .limit(8),
    ]);

    const mostAppliedJobs = await Application.aggregate([
      { $group: { _id: "$job", count: { $sum: 1 }, avgScore: { $avg: "$score" } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const skillAnalytics = await CandidateProfile.aggregate([
      { $unwind: "$skills" },
      { $group: { _id: "$skills", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]);

    res.json({
      stats: { users, jobs, applications, candidates, recruiters },
      recentApplications,
      mostAppliedJobs,
      skillAnalytics,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate("recruiter", "name email");
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

export const getAllApplications = async (req, res, next) => {
  try {
    const applications = await Application.find()
      .populate("candidate", "name email")
      .populate("job", "title companyName")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    next(error);
  }
};
