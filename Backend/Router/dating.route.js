import express from "express";
import {
  createOrUpdateDatingProfile,
  browseDatingProfiles,
  likeProfile,
  getMyDatingProfile,
} from "../controllers/dating.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/profile", authMiddleware, createOrUpdateDatingProfile);
router.get("/my-profile", authMiddleware, getMyDatingProfile);
router.get("/browse", authMiddleware, browseDatingProfiles);
router.post("/like", authMiddleware, likeProfile);

export default router;
