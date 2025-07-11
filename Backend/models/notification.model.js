import mongoose, { Schema } from "mongoose";
const ObjectId = Schema.ObjectId;

const NotificationSchema = new Schema({
    type: {
        type: String,
        enum: [
            "NEW_LIKE",
            "NEW_COMMENT",
            "POST_TRENDING",
            "COMMENT_REPLY",
            "NEW_FOLLOWER",
            "EVENT_REMINDER",
            "EVENT_TRENDING",
            "ADMIN_ANNOUNCEMENT"
        ],
        required: true
    },
    recipient: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    sender: {
        type: ObjectId,
        ref: "User"
    },
    post: {
        type: ObjectId,
        ref: "Post"
    },
    event: {
        type: ObjectId,
        ref: "Event"
    },
    message: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Notification = mongoose.model("Notification", NotificationSchema); 