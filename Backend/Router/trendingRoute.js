import express from 'express';
import { getTrendingPosts, getTrendingEvents } from '../controllers/trendingController.js';

const router = express.Router();

// GET /api/v1/trending/posts
router.get('/posts', getTrendingPosts);
// GET /api/v1/trending/events
router.get('/events', getTrendingEvents);

export default router; 