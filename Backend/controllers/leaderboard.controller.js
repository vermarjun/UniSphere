import User from "../models/user.model.js";
import { Post } from "../models/posts.model.js";

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Post.aggregate([
      {
        $group: {
          _id: "$userId",
          totalLikes: { $sum: { $size: "$likes" } },
          totalComments: { $sum: { $size: "$comments" } },
        },
      },
      {
        $addFields: {
          auraPoints: {
            $add: [{ $multiply: ["$totalLikes", 2] }, "$totalComments"],
          },
        },
      },
      {
        $sort: { auraPoints: -1 },
      },
      {
        $lookup: {
          from: "users", // name of the collection
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          fullname: "$user.fullname",
          email: "$user.email",
          auraPoints: 1,
          totalLikes: 1,
          totalComments: 1,
          profilePhoto: "$user.profile.profilePhoto",
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Leaderboard fetched successfully",
      leaderboard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};
