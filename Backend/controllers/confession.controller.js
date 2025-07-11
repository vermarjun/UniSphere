import Confession from "../models/confession.model.js";

// Create confession
export const createConfession = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.userId;

    if (!content) {
      return res
        .status(400)
        .json({ message: "Content is required", success: false });
    }

    const newConfession = await Confession.create({
      userId,
      content,
      likes: [],
      comments: [],
    });

    return res
      .status(201)
      .json({
        message: "Confession posted",
        success: true,
        confession: newConfession,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", success: false, error: err.message });
  }
};

// Get all confessions (anonymous view)
export const getAllConfessions = async (req, res) => {
  try {
    const confessions = await Confession.find().sort({ createdAt: -1 }).lean();

    const anonymousConfessions = confessions.map((c) => ({
      ...c,
      user: "Anonymous",
      likeCount: c.likes.length,
      commentCount: c.comments.length,
      comments: c.comments.map((comment) => ({
        ...comment,
        user: "Anonymous",
      })),
    }));

    return res
      .status(200)
      .json({ success: true, confessions: anonymousConfessions });
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "Failed to fetch confessions",
        success: false,
        error: err.message,
      });
  }
};

// Like a confession
export const likeConfession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const confession = await Confession.findById(id);
    if (!confession)
      return res
        .status(404)
        .json({ message: "Confession not found", success: false });

    const liked = confession.likes.includes(userId);

    if (liked) {
      confession.likes.pull(userId);
    } else {
      confession.likes.push(userId);
    }

    await confession.save();

    return res
      .status(200)
      .json({ message: liked ? "Unliked" : "Liked", success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Like failed", success: false, error: err.message });
  }
};

// Comment on a confession
export const commentOnConfession = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.userId;

    if (!text)
      return res
        .status(400)
        .json({ message: "Comment is required", success: false });

    const confession = await Confession.findById(id);
    if (!confession)
      return res
        .status(404)
        .json({ message: "Confession not found", success: false });

    confession.comments.push({ userId, text });
    await confession.save();

    return res.status(201).json({ message: "Comment added", success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Comment failed", success: false, error: err.message });
  }
};
