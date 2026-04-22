import express from "express";
import { applyToJob, getJobById, getJobs } from "../controllers/jobController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { USER_ROLES } from "../utils/constants.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/:id/apply", protect, authorize(USER_ROLES.CANDIDATE), applyToJob);

export default router;
