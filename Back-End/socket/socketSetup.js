require('dotenv').config();
const socketIO = require("socket.io");
const { encryptMessage, decryptMessage } = require("../Utils/cryptoUtils");
const ChatMessage = require("../Models/ChatMessageModel");

const setupSocketIO = (server)=>{
    const io = socketIO(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ['GET', 'POST'],
            allowedHeaders: ['my-custom-header'],
            credentials: true
        }
    });

        // Object to keep track of online users
        const onlineUsers = {}; 

    io.on("connection",(socket) => {
        console.log("New User connected", socket.id);

        // Track the user as online
        socket.on('setUserOnline', (userId) => {
            onlineUsers[userId] = socket.id;
            io.emit('updateUserStatus', { userId, status: 'online' });
        });


        // Handle incoming messages from the client
        socket.on("sendMessage", async (data) => {
            try {
                const { sender, receiver, message } = data;
                const encryptedMessage = encryptMessage(message);
                // Save to database
                const newMessage = new ChatMessage({
                    sender, 
                    receiver, 
                    message: encryptedMessage 
                    });
                await newMessage.save();

                // // Broadcast message to all clients
                io.emit('receiveMessage', {
                    sender,
                    receiver,
                    message: decryptMessage(encryptedMessage),
                    timestamp: new Date()
                }); 

                // Send message to the specific receiver
                // const receiverSocketId = onlineUsers[receiver];
                // if (receiverSocketId) {
                //     io.to(receiverSocketId).emit('receiveMessage', {
                //         sender,
                //         receiver,
                //         message: decryptMessage(encryptedMessage),
                //         timestamp: new Date()
                //     });
                // }

            } catch (error) {
                console.error('Error sending message:', error);
            }
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);

            // Find and remove the disconnected user
            for (const [userId, socketId] of Object.entries(onlineUsers)) {
                if (socketId === socket.id) {
                    delete onlineUsers[userId];
                    io.emit('updateUserStatus', { userId, status: 'offline' });
                    break;
                }
            }
        });
    });

    return io;
}

module.exports = setupSocketIO;