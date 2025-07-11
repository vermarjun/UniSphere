import express from "express";
import {
  createConfession,
  getAllConfessions,
  likeConfession,
  commentOnConfession,
} from "../controllers/confession.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

// All routes require login (can relax later if needed)
router.post("/", authMiddleware, createConfession);
router.get("/", authMiddleware, getAllConfessions);
router.put("/:id/like", authMiddleware, likeConfession);
router.post("/:id/comment", authMiddleware, commentOnConfession);

export default router;
