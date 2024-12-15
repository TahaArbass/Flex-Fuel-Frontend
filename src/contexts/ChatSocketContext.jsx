import React, { useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import BaseUrl from "../utils/baseUrl";
import { useAuth } from "./AuthContext";
const SocketContext = React.createContext();

const ChatSocketProvider = ({ children }) => {
    // Get token from context
    const { auth } = useAuth();
    const token = auth.token;

    // Initialize socket connection
    const socket = io(`${BaseUrl}/chat`, {
        query: { token: token },
    });

    // Connection state
    const [isConnected, setIsConnected] = useState(false);

    // Chat state
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [typing, setTyping] = useState(false); // Typing indicator state

    // Ref for socket instance
    const chatSocket = useRef(null);

    // Typing timeout ref for debouncing
    const typingTimeoutRef = useRef(null);

    // Cleanup listeners on unmount
    const cleanUpListeners = (socketInstance) => {
        if (!socketInstance) return;
        socketInstance.off("connect");
        socketInstance.off("disconnect");
        socketInstance.off("receiveMessage");
        socketInstance.off("typing");
        socketInstance.off("stopTyping");
        socketInstance.off("reconnect");
    };

    useEffect(() => {
        chatSocket.current = socket;

        // Listen for incoming messages
        chatSocket.current.on("receiveMessage", (data) => {
            console.log("Message received: " + data.user + '/ message:' + data.message);
            alert("Message received: " + data.user + '/ message:' + data.message);
            setMessages((prev) => [...prev, data]);
        });

        // Typing indicator
        chatSocket.current.on("typing", (user) => {
            console.log(`${user} is typing...`);
            setTyping(true);
        });

        // Stop typing indicator
        chatSocket.current.on("stopTyping", () => {
            setTyping(false);
        });

        // Reconnect to socket
        chatSocket.current.on("reconnect", () => {
            console.log("Reconnected to chat socket!");
            setIsConnected(true);
        });

        // on connect
        chatSocket.current.on("connect", () => {
            console.log("Connected to chat socket!");
            setIsConnected(true);
        });

        // on disconnect
        chatSocket.current.on("disconnect", () => {
            console.log("Disconnected from chat socket!");
            setIsConnected(false);
        });


        // Cleanup listeners on unmount
        return () => cleanUpListeners(chatSocket.current);
    }, [chatSocket]);

    // Send a message
    const sendMessage = (user, chat_id, message) => {
        if (!message.trim()) return;
        const data = { user, chat_id, message };
        console.log("Data: ", data);
        chatSocket.current.emit("sendMessage", data);
        setMessages((prev) => [...prev, { user, text: message }]); // Add locally sent message to state
        setMessage(""); // Clear input
    };

    // Handle typing indicator
    const handleTyping = (user, recipient, isTyping) => {
        if (!chatSocket.current) return;

        // Clear the previous timeout if the user is typing quickly
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Emit typing event with a debounce delay
        typingTimeoutRef.current = setTimeout(() => {
            chatSocket.current.emit(isTyping ? "typing" : "stopTyping", { user, recipient });
        }, 500); // 500ms debounce time
    };

    // join a chat room
    const joinChatRoom = (chat_id) => {
        chatSocket.current.emit("join", { chat_id });
    };


    // Provide the chat socket context for children components
    return (
        <SocketContext.Provider
            value={{
                isConnected,
                messages,
                typing,
                message,
                setMessage,
                sendMessage,
                handleTyping,
                joinChatRoom,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook to use chat socket context
const useChatSocket = () => useContext(SocketContext);

export { ChatSocketProvider, useChatSocket };
