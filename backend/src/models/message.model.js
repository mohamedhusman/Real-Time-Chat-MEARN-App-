import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      ref: "User",
      required: true,
    },

    receiverId: {
      type: String,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
// This code defines a Mongoose schema and model for a messaging system.
