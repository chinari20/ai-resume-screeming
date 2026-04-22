import express from "express";
import {
  createJob,
  deleteJob,
  getJobApplicants,
  getRecruiterJobs,
  getRecruiterProfile,
  runScreeningForJob,
  updateApplicationStatus,
  updateJob,
  upsertRecruiterProfile,
} from "../controllers/recruiterController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { USER_ROLES } from "../utils/constants.js";

const router = express.Router();

router.use(protect, authorize(USER_ROLES.RECRUITER));
router.get("/profile", getRecruiterProfile);
router.put("/profile", upsertRecruiterProfile);
router.get("/jobs", getRecruiterJobs);
router.post("/jobs", createJob);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);
router.get("/jobs/:id/applicants", getJobApplicants);
router.post("/jobs/:id/screen", runScreeningForJob);
router.patch("/applications/:id/status", updateApplicationStatus);

export default router;
