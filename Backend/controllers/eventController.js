import { Event } from '../models/events.model.js';  
import { Notification } from '../models/notification.model.js';


// Get Event by ID
export async function getEventById(req, res) {
    try {
        const { id } = req.params;

        const event = await Event.findById(id)
            .populate('userId', 'name email') // populate if needed
            .lean();

        if (!event) {
            return res.status(404).json({
                message: "Event not found",
                success: false
            });
        }

        event.upvoteCount = event.upvotes.length;

        return res.status(200).json({
            message: event,
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

// Get events
export async function fetchEvents(req, res){
    try {
        const {page, limit = 10} = req.query;
        const skip = (page - 1) * limit; // Calculate the number of documents to skip
        const paginatedEvents = await Event.aggregate([
            {
              $addFields: {
                upvoteCount: { $size: "$upvotes" }, // Stage 1: Add a "likeCount" field
              },
            },
            {
              $sort: { upvoteCount: -1, updatedAt: -1 }, // Stage 2: Sort by likeCount and updatedAt
            },
            {
              $skip: parseInt(skip), // Stage 3: Skip the previous documents
            },
            {
              $limit: parseInt(limit), // Stage 4: Limit the number of documents fetched
            },
        ]);
        return res.status(200).json({message : paginatedEvents, success : true});
    } catch(error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
}

// Create Post
export async function createEvent(req, res){
    try {
        const {eventTitle, eventCaption, media, deadLine, department} = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        if (!eventCaption) {
            return res.status(400).json({message:"Caption is required", success:false});
        }
        const newEvent = new Event({
            userId: userId,
            title: eventTitle,
            media:[...media],
            caption: eventCaption,
            department: department,
            expired: false,
            deadLine: deadLine,
            upvotes: [],
            comments: [],
        })
        await newEvent.save();
        await Notification.create({
          type: 'EVENT_REMINDER',
          recipient: userId,
          event: newEvent._id,
          message: 'Reminder: Your event is scheduled.'
        });
        return res.status(200).json({message:"Event Created!", success:true});
    } catch(error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
}

// Edit Post
export async function editEvent(req, res){
    try {
        const {eventTitle, eventCaption, media, deadLine, department, eventId} = req.body;
        if (!eventCaption) {
            return res.status(400).json({message:"Caption is required", success:false});
        }
        if (!eventTitle) {
            return res.status(400).json({message:"Title is required", success:false});
        }
        if (!deadLine) {
            return res.status(400).json({message:"Deadline is required", success:false});
        }
        if (!department) {
            return res.status(400).json({message:"Department is required", success:false});
        }
        if (!eventId) {
            return res.status(400).json({message:"EventId is required", success:false});
        }
        await Event.findByIdAndUpdate(eventId, {
            title: eventTitle,
            media:[...media],
            caption: eventCaption,
            department: department,
            expired: false,
            deadLine: deadLine,
        });
        return res.status(200).json({message:"Event Updated", success:true});
    } catch(error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
}

// Delete Post
export async function deleteEvent(req, res){
    try {
        const eventId = req.body.eventId;
        await Event.deleteOne({_id: eventId});
        return res.status(200).json({message:"Event Deleted!", success : true});
    } catch(error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
}
