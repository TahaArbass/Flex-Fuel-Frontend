import React, { useState } from "react";
import { useChatSocket } from "../contexts/ChatSocketContext";
import { Box, Button, Input, Paper, Typography } from "@mui/material";

const PlaygroundForMe = () => {
    const { sendMessage, messages, message, setMessage, joinChatRoom } = useChatSocket();
    const [user, setUser] = useState("");
    const [recipient, setRecipient] = useState("");
    const handleSendMessage = () => {
        sendMessage(user, recipient, message);
    }

    const handleJoinChatRoom = () => {
        joinChatRoom("64467226-9b3a-4521-b9a7-4745c8341d0d");;
    }

    return (
        <Paper elevation={3} style={{ padding: "1rem" }}>
            <Box>
                <Typography variant="h4" gutterBottom>Playground</Typography>
                <Input
                    placeholder="User"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    sx={{ padding: "0.5rem", marginX: "0.5rem" }}
                />
                <Input
                    placeholder="Recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    sx={{ padding: "0.5rem", marginX: "0.5rem" }}
                />
                <Input
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{ padding: "0.5rem", marginX: "0.5rem" }}
                />
                <Button variant="contained" size='large' onClick={handleSendMessage}>Send</Button>
                <Button variant="contained" size='large' onClick={handleJoinChatRoom}>Join Chat Room</Button>
            </Box>

            {/* display messages */}
            <Box>
                {messages.map((msg, index) => (
                    <Typography key={index}>{msg.user}: {msg.text}</Typography>
                ))}
            </Box>
        </Paper>
    );
}

export default PlaygroundForMe;