import express from "express";
import {
  getAdminDashboard,
  getAllApplications,
  getAllJobs,
  getAllUsers,
} from "../controllers/adminController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { USER_ROLES } from "../utils/constants.js";

const router = express.Router();

router.use(protect, authorize(USER_ROLES.ADMIN));
router.get("/dashboard", getAdminDashboard);
router.get("/users", getAllUsers);
router.get("/jobs", getAllJobs);
router.get("/applications", getAllApplications);

export default router;
