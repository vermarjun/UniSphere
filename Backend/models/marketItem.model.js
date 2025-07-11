import mongoose from "mongoose";

const marketItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: [String], // can store multiple image URLs
    default: [],
  },
  contact: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

export default mongoose.model("MarketItem", marketItemSchema);
