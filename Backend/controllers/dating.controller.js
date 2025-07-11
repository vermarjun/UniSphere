import DatingProfile from "../models/DatingProfile.model.js";
import User from "../models/user.model.js";

// Create or Update Dating Profile
export const createOrUpdateDatingProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { bio, images, interests } = req.body;

    const profile = await DatingProfile.findOneAndUpdate(
      { user: userId },
      { bio, images, interests },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Profile saved", profile, success: true });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error saving profile", error: err.message });
  }
};

// Get all profiles except the current user (browse)
export const browseDatingProfiles = async (req, res) => {
  try {
    const profiles = await DatingProfile.find({
      user: { $ne: req.userId },
    }).populate("user", "fullname profile.profilePhoto");

    res.status(200).json(profiles);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching profiles", error: err.message });
  }
};

// Like a profile
export const likeProfile = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const userId = req.userId;

    const targetProfile = await DatingProfile.findOne({ user: targetUserId });
    if (!targetProfile) {
      return res.status(404).json({ message: "Target profile not found" });
    }

    if (targetProfile.likes.includes(userId)) {
      return res.status(400).json({ message: "Already liked" });
    }

    targetProfile.likes.push(userId);
    await targetProfile.save();

    res.status(200).json({ message: "Profile liked", success: true });
  } catch (err) {
    res.status(500).json({ message: "Like failed", error: err.message });
  }
};

// Get my dating profile (for editing or viewing)
export const getMyDatingProfile = async (req, res) => {
  try {
    const profile = await DatingProfile.findOne({ user: req.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};
