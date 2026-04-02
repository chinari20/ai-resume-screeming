import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import CandidateProfile from "../models/CandidateProfile.js";
import RecruiterProfile from "../models/RecruiterProfile.js";
import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import { USER_ROLES } from "../utils/constants.js";
import { scoreApplication } from "../services/scoringService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, "..", "..");
const projectRoot = path.resolve(backendRoot, "..");

dotenv.config({ path: path.join(backendRoot, ".env") });
dotenv.config({ path: path.join(projectRoot, ".env"), override: false });

const makeResumeText = (name, skills, years, education) =>
  `${name}\nEmail: ${name.toLowerCase().replace(/\s+/g, ".")}@mail.com\nPhone: +91 9999999999\nSkills: ${skills.join(", ")}\nExperience: ${years} years building production web apps.\nEducation: ${education}\nProjects: Worked on scalable hiring and analytics systems.`;

const seed = async () => {
  await connectDB();
  await Promise.all([
    Application.deleteMany({}),
    Job.deleteMany({}),
    Resume.deleteMany({}),
    CandidateProfile.deleteMany({}),
    RecruiterProfile.deleteMany({}),
    User.deleteMany({}),
  ]);

  const admin = await User.create({
    name: "Platform Admin",
    email: "admin@hireai.com",
    password: "Admin@123",
    role: USER_ROLES.ADMIN,
  });

  const recruiters = await User.create([
    {
      name: "Ava Recruiter",
      email: "ava@talentforge.com",
      password: "Recruiter@123",
      role: USER_ROLES.RECRUITER,
    },
    {
      name: "Noah Recruiter",
      email: "noah@cloudhire.com",
      password: "Recruiter@123",
      role: USER_ROLES.RECRUITER,
    },
  ]);

  const recruiterProfiles = await RecruiterProfile.create([
    {
      user: recruiters[0]._id,
      companyName: "Talent Forge",
      industry: "HR Tech",
      location: "Bengaluru",
      about: "Building AI-powered recruitment systems.",
    },
    {
      user: recruiters[1]._id,
      companyName: "Cloud Hire Labs",
      industry: "SaaS",
      location: "Hyderabad",
      about: "Hiring engineering and product talent for cloud-first companies.",
    },
  ]);

  const candidates = await User.create([
    { name: "Riya Sharma", email: "riya@mail.com", password: "Candidate@123", role: USER_ROLES.CANDIDATE },
    { name: "Arjun Mehta", email: "arjun@mail.com", password: "Candidate@123", role: USER_ROLES.CANDIDATE },
    { name: "Sara Khan", email: "sara@mail.com", password: "Candidate@123", role: USER_ROLES.CANDIDATE },
    { name: "Dev Patel", email: "dev@mail.com", password: "Candidate@123", role: USER_ROLES.CANDIDATE },
    { name: "Maya Iyer", email: "maya@mail.com", password: "Candidate@123", role: USER_ROLES.CANDIDATE },
  ]);

  const candidateData = [
    { skills: ["react", "node.js", "mongodb", "javascript", "tailwind css"], years: 4, education: "B.Tech Computer Science" },
    { skills: ["python", "sql", "docker", "aws", "javascript"], years: 5, education: "MCA" },
    { skills: ["react", "typescript", "redux", "css", "html"], years: 3, education: "BCA" },
    { skills: ["node.js", "express", "mongodb", "rest api", "git"], years: 2, education: "Bachelor of Engineering" },
    { skills: ["java", "spring", "sql", "aws", "docker"], years: 6, education: "MBA IT" },
  ];

  const candidateProfiles = [];
  const resumes = [];
  for (let index = 0; index < candidates.length; index += 1) {
    const candidate = candidates[index];
    const data = candidateData[index];
    const resume = await Resume.create({
      candidate: candidate._id,
      fileName: `${candidate.name}-resume.pdf`,
      filePath: `uploads/${candidate.name}-resume.pdf`,
      mimeType: "application/pdf",
      extractedText: makeResumeText(candidate.name, data.skills, data.years, data.education),
      extractedName: candidate.name,
      extractedEmail: candidate.email,
      extractedPhone: "+91 9999999999",
      extractedSkills: data.skills,
      extractedEducation: [data.education],
      extractedExperienceYears: data.years,
    });
    resumes.push(resume);

    const profile = await CandidateProfile.create({
      user: candidate._id,
      fullName: candidate.name,
      location: ["Bengaluru", "Pune", "Delhi", "Mumbai", "Remote"][index],
      skills: data.skills,
      education: [{ degree: data.education, institution: "Demo University", endYear: 2021 + index }],
      experience: [{ company: "Sample Co", role: "Software Engineer", years: data.years }],
      totalExperienceYears: data.years,
      resumePath: resume.filePath,
      parsedResume: resume._id,
      linkedin: `https://linkedin.com/in/${candidate.name.toLowerCase().replace(/\s+/g, "")}`,
      github: `https://github.com/${candidate.name.toLowerCase().replace(/\s+/g, "")}`,
    });
    candidateProfiles.push(profile);
  }

  const jobs = await Job.create([
    {
      recruiter: recruiters[0]._id,
      recruiterProfile: recruiterProfiles[0]._id,
      title: "Full Stack MERN Developer",
      companyName: recruiterProfiles[0].companyName,
      location: "Bengaluru",
      jobType: "Full-time",
      salaryRange: "12-18 LPA",
      requiredSkills: ["react", "node.js", "mongodb", "javascript"],
      preferredSkills: ["docker", "aws"],
      minimumExperience: 3,
      educationRequirement: "B.Tech",
      jobDescription: "Build scalable React, Node.js and MongoDB applications, collaborate on REST APIs, and deliver clean UI with Tailwind CSS.",
      status: "open",
    },
    {
      recruiter: recruiters[0]._id,
      recruiterProfile: recruiterProfiles[0]._id,
      title: "Frontend React Engineer",
      companyName: recruiterProfiles[0].companyName,
      location: "Remote",
      jobType: "Full-time",
      salaryRange: "10-16 LPA",
      requiredSkills: ["react", "typescript", "redux", "css"],
      preferredSkills: ["next.js"],
      minimumExperience: 2,
      educationRequirement: "BCA",
      jobDescription: "Create modern React interfaces, reusable components, and responsive experiences for recruiting platforms.",
      status: "open",
    },
    {
      recruiter: recruiters[1]._id,
      recruiterProfile: recruiterProfiles[1]._id,
      title: "Backend Node.js Engineer",
      companyName: recruiterProfiles[1].companyName,
      location: "Hyderabad",
      jobType: "Hybrid",
      salaryRange: "14-20 LPA",
      requiredSkills: ["node.js", "express", "mongodb", "rest api"],
      preferredSkills: ["docker", "aws"],
      minimumExperience: 2,
      educationRequirement: "Bachelor",
      jobDescription: "Develop Node.js services, MongoDB data models, secure APIs, and backend workflows for hiring systems.",
      status: "open",
    },
    {
      recruiter: recruiters[1]._id,
      recruiterProfile: recruiterProfiles[1]._id,
      title: "Cloud DevOps Engineer",
      companyName: recruiterProfiles[1].companyName,
      location: "Pune",
      jobType: "Full-time",
      salaryRange: "16-24 LPA",
      requiredSkills: ["aws", "docker", "kubernetes", "sql"],
      preferredSkills: ["python"],
      minimumExperience: 4,
      educationRequirement: "MCA",
      jobDescription: "Own cloud infrastructure, Docker pipelines, AWS deployments, and observability tooling.",
      status: "open",
    },
    {
      recruiter: recruiters[0]._id,
      recruiterProfile: recruiterProfiles[0]._id,
      title: "Technical Product Analyst",
      companyName: recruiterProfiles[0].companyName,
      location: "Delhi",
      jobType: "Full-time",
      salaryRange: "8-12 LPA",
      requiredSkills: ["sql", "javascript", "git"],
      preferredSkills: ["react"],
      minimumExperience: 1,
      educationRequirement: "MBA",
      jobDescription: "Work with hiring product data, analyze funnels, and support recruiter operations with dashboards and reporting.",
      status: "open",
    },
  ]);

  const applications = [];
  const applicationPairs = [
    [0, 0], [1, 0], [2, 1], [0, 1], [3, 2],
    [1, 3], [4, 3], [2, 4], [3, 4], [0, 2],
  ];

  for (const [candidateIndex, jobIndex] of applicationPairs) {
    const profile = candidateProfiles[candidateIndex];
    const resume = resumes[candidateIndex];
    const job = jobs[jobIndex];
    const scoring = scoreApplication({ job, resume, profile });
    const application = await Application.create({
      job: job._id,
      candidate: candidates[candidateIndex]._id,
      candidateProfile: profile._id,
      resume: resume._id,
      status: scoring.score >= 80 ? "shortlisted" : "under review",
      ...scoring,
    });
    applications.push(application);
  }

  console.log("Seed complete");
  console.log({
    admin: admin.email,
    recruiter: recruiters[0].email,
    candidate: candidates[0].email,
    password: "Admin@123 / Recruiter@123 / Candidate@123",
    jobs: jobs.length,
    applications: applications.length,
  });

  await mongoose.connection.close();
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
