import MarketItem from "../models/marketItem.model.js";

// Create a new item
export const createMarketItem = async (req, res) => {
  try {
    const { description, image, contact, price } = req.body;
    const userId = req.userId; // from auth middleware

    const newItem = await MarketItem.create({
      user: userId,
      description,
      image,
      contact,
      price,
    });

    res.status(201).json(newItem);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create item", error: err.message });
  }
};

// Get all items
export const getAllMarketItems = async (req, res) => {
  try {
    const items = await MarketItem.find().populate("user", "name email");
    res.status(200).json(items);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch items", error: err.message });
  }
};

// Get single item by ID
export const getMarketItemById = async (req, res) => {
  try {
    const item = await MarketItem.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching item", error: err.message });
  }
};

// Update item (owner only)
export const updateMarketItem = async (req, res) => {
  try {
    const item = await MarketItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.user.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    const { description, image, contact, price } = req.body;
    item.description = description || item.description;
    item.image = image || item.image;
    item.contact = contact || item.contact;
    item.price = price || item.price;

    await item.save();
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Delete item (owner only)
export const deleteMarketItem = async (req, res) => {
  try {
    const item = await MarketItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.user.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    await item.deleteOne();
    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed", error: err.message });
  }
};
