import { Post } from '../models/posts.model.js' 
import { Notification } from '../models/notification.model.js';
import { Comment } from '../models/comments.model.js';

// Get Post by ID
export async function getPostById(req, res) {
    try {
        const { id } = req.params;

        const post = await Post.findById(id)
            .populate('userId', 'name email') // optional: populate user details
            .lean(); // convert to plain JS object for easy manipulation

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            });
        }

        // Optional: include likeCount
        post.likeCount = post.likes?.length || 0;

        return res.status(200).json({
            message: post,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
}



// Get posts
export async function fetchPosts(req, res){
    try {
        const {page, limit} = req.query;
        const skip = (page - 1) * limit; // Calculate the number of documents to skip
        const paginatedPosts = await Post.aggregate([
            {
              $addFields: {
                likeCount: { $size: "$likes" }, // Stage 1: Add a "likeCount" field
              },
            },
            {
              $sort: { likeCount: -1, updatedAt: -1 }, // Stage 2: Sort by likeCount and updatedAt
            },
            {
              $skip: parseInt(skip), // Stage 3: Skip the previous documents
            },
            {
              $limit: parseInt(limit), // Stage 4: Limit the number of documents fetched
            },
        ]);
        return res.status(200).json({message:paginatedPosts, success:true});
    } catch(error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
}

// Create Post
export async function createPost(req, res){
    try {
        const {caption, media} = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        if (!caption) {
            return res.status(400).json({message:"Caption is required", success:false});
        }
        const newPost = new Post({
            userId: userId,
            media:[...media],
            caption:caption,
            likes: [],
            comments: [],
        })
        await newPost.save();
        return res.status(200).json({message:"Post Created!", success:true});
    } catch(error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
}

// Edit Post
export async function editPost(req, res){
    try {
        const {postId, caption, media} = req.body;
        if (!caption) {
            return res.status(400).json({message:"Caption is required", success:false});
        }
        await Post.findByIdAndUpdate(postId, {caption:caption, media:media, updatedAt:Date.now()});
        return res.status(200).json({message:"Post Updated", success:true});
    } catch(error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
}

// Delete Post
export async function deletePost(req, res){
    try {
        const postId = req.body.postId;
        await Post.deleteOne({_id: postId})
        return res.status(200).json({message:"Post Deleted!", success:true});
    } catch(error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
}

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

// Comment on a post
export async function commentOnPost(req, res) {
    try {
        const { id } = req.params; // post id
        const { content, replyTo } = req.body; // replyTo is optional (comment id)
        const userId = req.userId;
        if (!content) {
            return res.status(400).json({ message: 'Comment content is required', success: false });
        }
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found', success: false });
        }
        // Create comment
        const newComment = await Comment.create({ userId, content });
        post.comments.push({ commentId: newComment._id });
        await post.save();
        // Notify post owner (if not self)
        if (!post.userId.equals(userId)) {
            await Notification.create({
                type: 'NEW_COMMENT',
                recipient: post.userId,
                sender: userId,
                post: post._id,
                message: 'Someone commented on your post.'
            });
        }
        // If replyTo is provided, notify the original commenter (if not self)
        if (replyTo) {
            const parentComment = await Comment.findById(replyTo);
            if (parentComment && !parentComment.userId.equals(userId)) {
                await Notification.create({
                    type: 'COMMENT_REPLY',
                    recipient: parentComment.userId,
                    sender: userId,
                    post: post._id,
                    message: 'Someone replied to your comment.'
                });
            }
        }
        return res.status(201).json({ message: 'Comment added', success: true, comment: newComment });
    } catch (error) {
        return res.status(500).json({ message: 'Comment failed', success: false, error: error.message });
    }
}

// Like or unlike a post
export async function likePost(req, res) {
    try {
        const { id } = req.params; // post id
        const userId = req.userId;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found', success: false });
        }
        const liked = post.likes.includes(userId);
        if (liked) {
            post.likes.pull(userId);
        } else {
            post.likes.push(userId);
            // Notify post owner (if not self)
            if (!post.userId.equals(userId)) {
                await Notification.create({
                    type: 'NEW_LIKE',
                    recipient: post.userId,
                    sender: userId,
                    post: post._id,
                    message: 'Someone liked your post.'
                });
            }
        }
        await post.save();
        return res.status(200).json({ message: liked ? 'Unliked' : 'Liked', success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Like failed', success: false, error: error.message });
    }
}
