import { Notification } from '../models/notification.model.js';
import User from '../models/user.model.js';

// Fetch notifications for a user
export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.userId;
        const notifications = await Notification.find({ recipient: userId })
            .sort({ createdAt: -1 })
            .lean();
        return res.status(200).json({ success: true, notifications });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch notifications', error: error.message });
    }
};

// Create admin announcement notification for all users
export const createAdminAnnouncement = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, message: 'Announcement message is required' });
        }
        const users = await User.find({}, '_id');
        const notifications = users.map(u => ({
            type: 'ADMIN_ANNOUNCEMENT',
            recipient: u._id,
            message
        }));
        await Notification.insertMany(notifications);
        return res.status(201).json({ success: true, message: 'Announcement sent to all users' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to send announcement', error: error.message });
    }
}; 