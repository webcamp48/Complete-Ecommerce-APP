import React, { useEffect, useRef, useState } from 'react';
import './RealTimeChat.css';
import io from 'socket.io-client';
import { FaSearch } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../../Components/ReuseableComponent/Loader';
import { fetchUsers, fetchChatHistory, addMessage, fetchSelectedUser, updateUserStatus } from './../../Store/features/ChatSlice/ChatSlice';

// import socket from './socket';
const socket = io(import.meta.env.VITE_BACKEND_URL);   // socket connection backend

const RealTimeChat = () => {

    const API_URL_IMAGE_UPLOAD = `${import.meta.env.VITE_BACKEND_URL}/images/userProfiles`;
    const dispatch = useDispatch();
    const { messages, users, selectedUser, loading, error } = useSelector((state) => state.chat);
    const senderId = useSelector((state) => state.login.userId); // current user Sender ID
    const [message, setMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [unreadMessages, setUnreadMessages] = useState({});
    const [onlineAlerts, setOnlineAlerts] = useState([]); 
    const alertedUsers = useRef(new Set()); 
    const messagesContainerRef = useRef(null);
    
    // Notification sound
    const notificationSound = new Audio('/sounds/notification.wav');

    // Handle user status updates
    // useEffect(() => {
    //     socket.emit('setUserOnline', senderId);

    //     socket.on('updateUserStatus', ({ userId, status }) => {
    //         dispatch(updateUserStatus({ userId, status }));

    //         if (status === 'online') {
    //             const user = users.find(user => user._id === userId);
    //             if (user && !alertedUsers.current.has(userId)) {
    //                 // Add alert message
    //                 setOnlineAlerts((prevAlerts) => [
    //                     ...prevAlerts,
    //                     `${user.fullName} is now online!`
    //                 ]);
    //                 // Remove alert after 5 seconds
    //                 setTimeout(() => {
    //                     setOnlineAlerts((prevAlerts) =>
    //                         prevAlerts.filter(alert => alert !== `${user.fullName} is now online!`)
    //                     );
    //                 }, 3000);
    //                 // Add userId to the set to avoid duplicate alerts
    //                 alertedUsers.current.add(userId);
    //                 // notificationSound.play();
    //             }
    //         }
    //     });

    //     return () => {
    //         socket.off('updateUserStatus');
    //     };
    // }, [senderId, dispatch, users]);


    // Scroll to the bottom of the messages container
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Request permission for browser notifications
    useEffect(() => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);

    // Fetch chat history for the selected user
    useEffect(() => {
        if (selectedUser) {
            dispatch(fetchChatHistory({ senderId, receiverId: selectedUser._id }));
        }
    }, [dispatch, selectedUser]);


    // Fetch all users and handle incoming messages
    useEffect(() => {
        dispatch(fetchUsers());

        socket.on("receiveMessage", (message) => {
            const senderUser = users.find(user => user._id === message.sender);
            const senderName = senderUser ? senderUser.fullName : 'Unknown User';

            if (message.sender !== senderId && selectedUser?._id !== message.sender) {
                notificationSound.play().catch(error => console.log("Error playing sound:", error));
                // Browser Notification
                if (Notification.permission === "granted") {
                    new Notification(`New message from ${senderName}`, {
                        body: message.message,
                        icon : getProfileImageUrl(senderUser?.profileImage),
                    });
                }
                // Update unread messages count
                setUnreadMessages((prevUnreadMessages) => ({
                    ...prevUnreadMessages,
                    [message.sender]: (prevUnreadMessages[message.sender] || 0) + 1
                }));
                document.title = "New Message!";
                setTimeout(() => {
                    document.title = "Your Chat App";
                }, 3000);
            }
            dispatch(addMessage(message));
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [dispatch, senderId, selectedUser]);

    // Handle receiver selection and reset unread messages
    const selectReceiver = (user) => {
        dispatch(fetchSelectedUser(user));
        dispatch(fetchChatHistory({ senderId, receiverId: user._id }));
        setUnreadMessages((prevUnreadMessages) => ({
            ...prevUnreadMessages,
            [user._id]: 0
        }));
    };

    // Send message
    const sendMessage = () => {
        if (message.trim() && senderId && selectedUser) {
            const newMessage = { sender: senderId, receiver: selectedUser._id, message };
            socket.emit('sendMessage', newMessage);
            dispatch(addMessage(newMessage));
            // Fetch updated chat history
            dispatch(fetchChatHistory({ senderId, receiverId: selectedUser._id }));
            setMessage("");
        }
    };

    // Filter users based on the search query
    const filteredUsers = users.filter((user) => {
        return user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    
    const getProfileImageUrl = (profileImage) => {
        return profileImage ? `${API_URL_IMAGE_UPLOAD}/${profileImage}` : "https://via.placeholder.com/50"; // Placeholder if no image
    };

    return (
        <section className='chat-app'>
            <div className="chat-app-container">
                {/* <div className="chat-app-msg-alerts">
                    {onlineAlerts.map((alert, index) => (
                        <div key={index} className="chat-app-msg-alert">
                            {alert}
                        </div>
                    ))}
                </div> */}
                <div className="chat-app-left">
                    <div className="chat-app-left-user-profile">
                        <img src={getProfileImageUrl(users.find((user) => user._id === senderId)?.profileImage)} alt="Your profile" />
                        <div className='chat-app-left-user'>
                            <h2>{users.find((user) => user._id === senderId)?.fullName || "Ali"}</h2>
                            <p className={`status-indicator ${users.find((user) => user._id === senderId)?.status === 'online' ? 'status-online' : 'status-offline'}`}>
                                {users.find((user) => user._id === senderId)?.status === 'online' ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>
                    <div className="chat-app-left-search">
                        <FaSearch />
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search People' required />
                    </div>
                    <strong className='head'>Chat Messages</strong>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <p className='nofound'>Error: {error}</p>
                    ) : (
                        <div className="chat-app-left-all-people">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <div key={user._id} title={user.fullName} onClick={() => selectReceiver(user)} className={`chat-app-left-person ${selectedUser?._id === user._id ? "selected" : ""}`}>
                                        <img src={getProfileImageUrl(user.profileImage)} alt={`${user.fullName}'s profile`} />
                                        <div className="chat-app-left-person-name-chats">
                                            <strong className='chat-app-left-person-name'>{user.fullName}</strong>
                                            {unreadMessages[user._id] > 0 && (
                                                <span className="unread-badge">{unreadMessages[user._id]}</span>
                                            )}
                                        </div>
                                        <div className={user.status === 'online' ? 'status-online' : 'status-offline'}>
                                            {user.status === 'online' ? 'Online' : 'Offline'}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className='no-users-message'>No users found</p>
                            )}
                        </div>
                    )}
                </div>
                <div className="chat-app-right">
                    <div className="chat-app-right-header">
                    <img src={selectedUser ? getProfileImageUrl(selectedUser.profileImage) : "https://via.placeholder.com/50"} alt={selectedUser ? `${selectedUser.fullName}'s profile` : "Demo User"} />
                        <strong className='chat-app-right-name'>{selectedUser ? selectedUser.fullName : "Demo User"}</strong>
                    </div>
                    <div className="chat-app-right-messages" ref={messagesContainerRef}>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <p className='nofound'>Error: {error}</p>
                        ) : messages.length === 0 ? (
                            <p>No messages yet</p>
                        ) : (
                            messages.map((msg, index) => (
                                <p key={index}>
                                    {msg.sender === senderId ? `You: ${msg.message}` : `${selectedUser?.fullName}: ${msg.message}`}
                                    <span> Aug 23 at 12:30 pm </span>
                                </p>
                            ))
                        )}
                    </div>
                    <div className="chat-app-right-bottom">
                        <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder='Type your message here...' />
                        <IoIosSend onClick={sendMessage} className="chat-app-right-send-btn" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RealTimeChat;
