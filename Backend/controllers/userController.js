import User from '../models/user.model.js'; 
import { Post } from "../models/posts.model.js"; 
import bcrypt from 'bcryptjs';  
import jwt from 'jsonwebtoken';  
import { Notification } from '../models/notification.model.js';

// Register User
export const registerUser = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password } = req.body;

        // Check for missing fields
        if (!fullname || !email || !phoneNumber || !password) {
            return res.status(400).json({ 
                message: "All fields are required.", 
                success: false 
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'Email already registered', 
                success: false 
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword
        });

        return res.status(201).json({ 
            message: "Account created successfully", 
            success: true,
            user: newUser 
        });
    } catch (error) {
        console.error("Error in registerUser:", error.message); // Log the error
        return res.status(500).json({ 
            message: "Server error. Please try again later.", 
            success: false, 
            error: error.message 
        });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        // Make email case-insensitive
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect email or password', success: false });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        }).status(200).json({ message: `Welcome back ${user.fullname}`, user, success: true });

    } catch (error) {
        console.error("Login error:", error); // Log the error for debugging
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
};

// Logout User
export const logoutUser = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.status(200).json({ message: 'Logout successful', success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Server error. Please try again later.', success: false, error: error.message });
    }
};

// Update User Profile
// Update User Profile


export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, socialLinks, department, profilePhoto } = req.body;
        const userId = req.userId; // Extracted from JWT middleware

        // Ensure the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Update user fields if provided
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        // Initialize profile if it doesn't exist
        if (!user.profile) {
            user.profile = {};
        }

        // Update profile fields if provided
        if (bio) user.profile.bio = bio;
        if (socialLinks) {
            if (Array.isArray(socialLinks)) {
                user.profile.socialLinks = socialLinks; // Update directly if an array
            } else if (typeof socialLinks === "string") {
                user.profile.socialLinks = socialLinks.split(','); // Convert a comma-separated string to an array
            }
        }
        if (department) user.profile.department = department; // Reference to the `Department` model
         if (profilePhoto) user.profile.profilePhoto = profilePhoto; // Update profile photo URL

        // Save changes to the user document
        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
};




export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch user
    const user = await User.findById(id).lean(); // .lean() to get plain JS object

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Fetch posts created by this user
    const posts = await Post.find({ userId: id })
      .sort({ updatedAt: -1 }) // optional: most recent first
      .lean();

    // Add like counts to each post
    const postsWithLikeCounts = posts.map((post) => ({
      ...post,
      likeCount: post.likes?.length || 0,
    }));

    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user,
      posts: postsWithLikeCounts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error. Please try again later.",
      success: false,
      error: error.message,
    });
  }
};

// Follow a user
export const followUser = async (req, res) => {
    try {
        const { id } = req.params; // id of the user to follow
        const userId = req.userId; // id of the current user
        if (userId === id) {
            return res.status(400).json({ message: "You cannot follow yourself", success: false });
        }
        const userToFollow = await User.findById(id);
        const currentUser = await User.findById(userId);
        if (!userToFollow || !currentUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        if (userToFollow.followers.includes(userId)) {
            return res.status(400).json({ message: "Already following", success: false });
        }
        userToFollow.followers.push(userId);
        currentUser.following.push(id);
        await userToFollow.save();
        await currentUser.save();
        // Create notification for the followed user
        await Notification.create({
            type: 'NEW_FOLLOWER',
            recipient: id,
            sender: userId,
            message: `${currentUser.fullname} started following you.`
        });
        return res.status(200).json({ message: "Followed successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
    try {
        const { id } = req.params; // id of the user to unfollow
        const userId = req.userId; // id of the current user
        if (userId === id) {
            return res.status(400).json({ message: "You cannot unfollow yourself", success: false });
        }
        const userToUnfollow = await User.findById(id);
        const currentUser = await User.findById(userId);
        if (!userToUnfollow || !currentUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        userToUnfollow.followers = userToUnfollow.followers.filter(f => f.toString() !== userId);
        currentUser.following = currentUser.following.filter(f => f.toString() !== id);
        await userToUnfollow.save();
        await currentUser.save();
        return res.status(200).json({ message: "Unfollowed successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
};
