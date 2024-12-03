const { encryptMessage, decryptMessage } = require("../Utils/cryptoUtils");
const ChatMessage = require("../Models/ChatMessageModel");

// Save a new message
const saveMessage = async (req, res) => {
    try {
        const { sender, receiver, message } = req.body;
        if (!sender || !receiver || !message) {
            return res.status(400).json({ success: false, message: "Sender, receiver, and message are required" });
        }
        const encryptedMessage = encryptMessage(message);
        const newMessage = new ChatMessage ({
            sender,
            receiver,
            message : encryptedMessage
        })
        await newMessage.save();
        res.status(200).json({newMessage, success : true, message: "Message saved successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message: "Error saving message" });
    }
}


// Get messages between two users
const getMessages = async (req, res) => {
    try {
        const { sender, receiver } = req.body;

        if (!sender || !receiver) {
            return res.status(400).json({ success: false, message: "Sender and receiver IDs are required" });
        }

        // Fetch messages
        const messages = await ChatMessage.find({
            $or: [
                { sender,  receiver },
                { sender: receiver, receiver: sender }
            ]
        }).sort({ updatedAt: 1 });

        //before send message Decrypt messages
        const decryptedMessages = messages.map(msg => ({
            ...msg.toObject(),
            message: decryptMessage(msg.message) 
        }));

        res.status(200).json({ success: true, chats: decryptedMessages });
    } catch (error) {
        console.error("Error fetching messages:", error); 
        res.status(500).json({ success: false, message: "Failed to fetch messages" });
    }
};

module.exports = {saveMessage, getMessages};