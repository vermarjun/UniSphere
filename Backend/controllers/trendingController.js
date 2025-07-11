import { Post } from '../model/posts.js';
import { Event } from '../models/events.model.js';

// Adjustable weights
const LIKE_WEIGHT = 2;
const COMMENT_WEIGHT = 3;
const AGE_WEIGHT = 0.2;

// Adjustable weights for events
const UPVOTE_WEIGHT = 2.5;
const EVENT_COMMENT_WEIGHT = 3;
const EVENT_AGE_WEIGHT = 0.15;
const DEADLINE_WEIGHT = 0.1;

// Trending posts controller
export const getTrendingPosts = async (req, res) => {
    try {
        const now = new Date();
        // Aggregate trending score for each post
        const posts = await Post.aggregate([
            {
                $addFields: {
                    likeCount: { $size: "$likes" },
                    commentCount: { $size: "$comments" },
                    ageInHours: {
                        $divide: [
                            { $subtract: [now, "$createdAt"] },
                            1000 * 60 * 60
                        ]
                    }
                }
            },
            {
                $addFields: {
                    trendingScore: {
                        $subtract: [
                            {
                                $add: [
                                    { $multiply: ["$likeCount", LIKE_WEIGHT] },
                                    { $multiply: ["$commentCount", COMMENT_WEIGHT] }
                                ]
                            },
                            { $multiply: ["$ageInHours", AGE_WEIGHT] }
                        ]
                    }
                }
            },
            { $sort: { trendingScore: -1 } },
            { $limit: 10 },
            {
                $project: {
                    _id: 1,
                    caption: 1,
                    media: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    trendingScore: 1,
                    likeCount: 1,
                    commentCount: 1
                }
            }
        ]);
        return res.status(200).json({ posts, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
};

// Trending events controller
export const getTrendingEvents = async (req, res) => {
    try {
        const now = new Date();
        // Aggregate trending score for each event
        const events = await Event.aggregate([
            {
                $addFields: {
                    upvoteCount: { $size: "$upvotes" },
                    commentCount: { $size: "$comments" },
                    ageInHours: {
                        $divide: [
                            { $subtract: [now, "$createdAt"] },
                            1000 * 60 * 60
                        ]
                    },
                    hoursToDeadline: {
                        $cond: [
                            { $ifNull: ["$deadLine", false] },
                            {
                                $divide: [
                                    { $subtract: [
                                        { $toDate: "$deadLine" },
                                        now
                                    ] },
                                    1000 * 60 * 60
                                ]
                            },
                            null
                        ]
                    }
                }
            },
            {
                $addFields: {
                    trendingScore: {
                        $subtract: [
                            {
                                $subtract: [
                                    {
                                        $add: [
                                            { $multiply: ["$upvoteCount", UPVOTE_WEIGHT] },
                                            { $multiply: ["$commentCount", EVENT_COMMENT_WEIGHT] }
                                        ]
                                    },
                                    { $multiply: ["$ageInHours", EVENT_AGE_WEIGHT] }
                                ]
                            },
                            { $multiply: [
                                { $ifNull: ["$hoursToDeadline", 0] }, DEADLINE_WEIGHT
                            ] }
                        ]
                    }
                }
            },
            { $sort: { trendingScore: -1 } },
            { $limit: 10 },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    caption: 1,
                    media: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    trendingScore: 1,
                    upvoteCount: 1,
                    commentCount: 1,
                    deadLine: 1
                }
            }
        ]);
        return res.status(200).json({ events, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
}; 