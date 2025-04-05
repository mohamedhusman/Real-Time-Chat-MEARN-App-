import Message from "../models/message.model.js";
import User from "../models/user.model.js";

// Function to get users for the sidebar
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Get the logged-in user's ID from the request
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get messages
export const getMessages = async (req, res) => {
  try {
    const userToChat = req.params.id;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChat },
        { senderId: userToChat, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to send a message
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload the image to cloudinary and get the URL
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
