// import React, { useEffect, useRef } from "react";
// import { useChatSocket } from "../contexts/ChatSocketContext";
// import { Box, TextField, Button, Typography, Paper } from "@mui/material"; // Material UI components

// const Chat = ({ user, room }) => {
//     const {
//         isConnected,
//         messages,
//         typing,
//         message,
//         setMessage,
//         joinRoom,
//         leaveRoom,
//         sendMessage,
//         handleTyping,
//     } = useChatSocket(); // Get the necessary functions and state from the socket context

//     const messageInputRef = useRef(null);

//     // Join room when component mounts
//     useEffect(() => {
//         // Join the room when the component is mounted or user/room changes
//         if (user && room && !isConnected) {
//             joinRoom(user, room);
//         }

//         // Leave the room when the component unmounts or user/room changes
//         return () => {
//             if (user && room) {
//                 leaveRoom(user, room);
//             }
//         };
//     }, [user, room, isConnected]);

//     // Handle typing input and emit typing events
//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         setMessage(value);
//         handleTyping(user, room, value.trim() !== "");
//     };

//     // Send a message
//     const handleSendMessage = (e) => {
//         e.preventDefault();
//         sendMessage(user, room);
//     };

//     return (
//         <Box
//             sx={{
//                 width: "100%",
//                 maxWidth: 600,
//                 margin: "0 auto",
//                 padding: 2,
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//                 height: "80vh",
//             }}
//         >
//             {/* Messages container */}
//             <Paper
//                 sx={{
//                     flexGrow: 1,
//                     overflowY: "auto",
//                     padding: 2,
//                     marginBottom: 2,
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 1,
//                 }}
//             >
//                 {messages.map((msg, idx) => (
//                     <Box key={idx} sx={{ display: "flex", flexDirection: "column" }}>
//                         <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//                             {msg.user}:
//                         </Typography>
//                         <Typography variant="body2">{msg.text}</Typography>
//                     </Box>
//                 ))}
//             </Paper>

//             {/* Typing indicator */}
//             {typing && (
//                 <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
//                     Someone is typing...
//                 </Typography>
//             )}

//             {/* Input form */}
//             <form onSubmit={handleSendMessage} style={{ display: "flex", flexDirection: "row", gap: 1 }}>
//                 <TextField
//                     ref={messageInputRef}
//                     variant="outlined"
//                     fullWidth
//                     value={message}
//                     onChange={handleInputChange}
//                     placeholder="Type a message..."
//                     size="small"
//                 />
//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     sx={{ height: "100%" }}
//                     disabled={!message.trim()}
//                 >
//                     Send
//                 </Button>
//             </form>
//         </Box>
//     );
// };

// export default Chat;

import { Box, Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useChatSocket } from "../contexts/ChatSocketContext";
// Initialize the socket connection once
// const chatSocket = io("http://localhost:3001/chat");

const TestingSockets = () => {
    const { sendMessage, joinRoom, leaveRoom } = useChatSocket();
    const [message, setMessage] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    // const joinRoom = () => {
    //     chatSocket.emit("join", {
    //         user: "John",
    //         room: "room1",
    //     });
    // };

    // const leaveRoom = () => {
    //     chatSocket.emit("leave", {
    //         user: "John",
    //         room: "room1",
    //     });
    // };

    // const sendMessage = () => {
    //     if (message.trim()) {
    //         chatSocket.emit("sendMessage", {
    //             user: "John",
    //             // room: "room1",
    //             recipient: "Jane",
    //             text: message,
    //         });
    //         setMessage("");
    //     }
    // };

    const handleSentMessage = (data) => {
        sendMessage(data.user, data.recipient, data.room,);
        setMessages((prev) => [...prev, data]);
    };

    return (
        <Box>
            <h1>Testing Sockets</h1>
            <h2>{isConnected ? "Connected" : "Not Connected"}</h2>
            <Box>
                <Button onClick={joinRoom}>Join Room</Button>
                <Button onClick={leaveRoom}>Leave Room</Button>
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <Button onClick={handleSentMessage}>Send</Button>
            </Box>
            <Box>
                <h3>Messages:</h3>
                {messages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.user}</strong>: {msg.text}
                    </p>
                ))}
            </Box>
        </Box>
    );
};

export default TestingSockets;
