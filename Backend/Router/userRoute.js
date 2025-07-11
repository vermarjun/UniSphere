import express from 'express';  // Import Express
import { registerUser, login, logoutUser, updateProfile, getUserById, followUser, unfollowUser } from '../controllers/userController.js';  // Import controllers
import authMiddleware from '../middlewares/auth.js';  // Import authentication middleware (if any)
import { getUserNotifications, createAdminAnnouncement } from '../controllers/notification.controller.js';
// import { singleUpload } from '../Middlewares/multer.js';
const router = express.Router();  // Initialize the router

// Register route
router.post('/register',registerUser);

// Login route
router.post('/login', login);

// Logout route
router.get('/logout', logoutUser);

// Profile update route (with authentication middleware)
router.post('/profile', authMiddleware, updateProfile);
router.get("/:id",authMiddleware, getUserById);

// Follow and unfollow routes
router.post('/:id/follow', authMiddleware, followUser);
router.post('/:id/unfollow', authMiddleware, unfollowUser);

// Fetch notifications for the authenticated user
router.get('/notifications', authMiddleware, getUserNotifications);

// Admin announcement endpoint
router.post('/notifications/announcement', authMiddleware, createAdminAnnouncement);


export default router;
