import express from 'express';  // Import Express
import authMiddleware from '../middlewares/auth.js';  // Import authentication middleware (if any)
import {fetchPosts, createPost, editPost, deletePost, getPostById, commentOnPost, likePost} from '../controllers/postController.js'

const router = express.Router();  // Initialize the router

// Get posts
router.get('/', fetchPosts);

// Create
router.post('/add', authMiddleware, createPost);

// Edit
router.post('/edit', authMiddleware, editPost);

// Delete 
router.delete('/delete', authMiddleware, deletePost);

router.get("/:id", authMiddleware,getPostById);

// Comment on a post
router.post('/:id/comment', authMiddleware, commentOnPost);

// Like or unlike a post
router.post('/:id/like', authMiddleware, likePost);


export default router;
