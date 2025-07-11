import express from "express";
import {
  createOrUpdateDatingProfile,
  browseDatingProfiles,
  likeProfile,
  getMyDatingProfile,
} from "../controllers/dating.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/profile", isAuthenticated, createOrUpdateDatingProfile);
router.get("/my-profile", isAuthenticated, getMyDatingProfile);
router.get("/browse", isAuthenticated, browseDatingProfiles);
router.post("/like", isAuthenticated, likeProfile);

export default router;
