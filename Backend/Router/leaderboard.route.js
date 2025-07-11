import { getLeaderboard } from "../controllers/leaderboard.controller.js";
import { Router } from "express";

const router = Router();

router.get("/leaderboard", getLeaderboard);


export default router;

