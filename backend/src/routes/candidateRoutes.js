import express from "express";
import {
  getCandidateProfile,
  getMyApplications,
  getRecommendedJobs,
  upsertCandidateProfile,
  uploadResume,
} from "../controllers/candidateController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { resumeUpload } from "../middleware/uploadMiddleware.js";
import { USER_ROLES } from "../utils/constants.js";

const router = express.Router();

router.use(protect, authorize(USER_ROLES.CANDIDATE));
router.get("/profile", getCandidateProfile);
router.put("/profile", upsertCandidateProfile);
router.post("/resume", resumeUpload.single("resume"), uploadResume);
router.get("/applications", getMyApplications);
router.get("/recommended-jobs", getRecommendedJobs);

export default router;
