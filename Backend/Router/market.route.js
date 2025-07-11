import express from "express";
import {
  createMarketItem,
  getAllMarketItems,
  getMarketItemById,
  updateMarketItem,
  deleteMarketItem,
} from "../controllers/market.controller.js";
import authMiddleware from "../middlewares/auth.js"; // Add your JWT auth here

const router = express.Router();

// Public Routes
router.get("/", getAllMarketItems);
router.get("/:id", getMarketItemById);

// Protected Routes
router.post("/", authMiddleware, createMarketItem);
router.put("/:id", authMiddleware, updateMarketItem);
router.delete("/:id", authMiddleware, deleteMarketItem);

export default router;
