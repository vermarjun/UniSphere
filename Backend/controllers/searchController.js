import mongoose from 'mongoose'; 
import User from '../models/user.model.js';
import { Post } from '../models/posts.model.js';

// Search Users by Username (fullname)
export const searchUsers = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || q.trim() === "") {
            return res.status(400).json({ message: "Query parameter 'q' is required.", success: false });
        }
        // Case-insensitive, partial match on fullname
        const users = await User.find({
            fullname: { $regex: q, $options: "i" }
        }).select("_id fullname profile.profilePhoto");
        return res.status(200).json({ users, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
};

// Search Posts by Keyword in Caption
export async function searchPosts(req, res) {
    try {
        const { q } = req.query;
        if (!q || q.trim() === "") {
            return res.status(400).json({ message: "Query parameter 'q' is required.", success: false });
        }
        // Case-insensitive, partial match on caption
        const posts = await Post.find({
            caption: { $regex: q, $options: "i" }
        })
        .select("_id caption media createdAt updatedAt")
        .limit(10);
        return res.status(200).json({ posts, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
}
