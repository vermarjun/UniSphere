import express from "express"
import { searchPosts, searchUsers } from '../controllers/searchController.js';
import authMiddleware from '../middlewares/auth.js';  // Import authentication middleware (if any)

const router = express.Router(); 

// Search users by username (fullname)
router.get('/users', authMiddleware ,searchUsers);

// Search posts by keyword in caption
router.get('/posts', authMiddleware ,searchPosts);

export default router;