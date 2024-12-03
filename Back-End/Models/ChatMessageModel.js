const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'LoginSignUp', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'LoginSignUp', required: true },
    message: { type: String, required: true },
}, { timestamps: true });

const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);

module.exports = ChatMessage;
