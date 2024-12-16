import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useChatSocket } from '../contexts/ChatSocketContext';

const ChatPage = () => {
    const location = useLocation();
    const userProfile = location.state?.userProfile; // Get the user profile from location state
    const {
        messages,
        typing,
        message,
        setMessage,
        sendMessage,
        handleTyping
    } = useChatSocket();

    if (!userProfile) {
        return <Typography variant="h6">No user selected for chat.</Typography>;
    }

    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage(userProfile.id, message);
            setMessage(''); // Clear input after sending
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setMessage(value);
        handleTyping(userProfile.id, value.length > 0);
    };

    return (
        <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Typography variant="h4" gutterBottom>
                Chat with {userProfile.username}
            </Typography>

            {/* Chat messages container */}
            <Paper
                elevation={2}
                sx={{
                    flex: 1,
                    padding: 2,
                    borderRadius: 2,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    marginBottom: 2,
                }}
            >
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: msg.user === userProfile.id ? 'flex-start' : 'flex-end',
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: '70%',
                                padding: 1,
                                borderRadius: 2,
                                bgcolor: msg.user === userProfile.id ? 'warning.main' : 'primary.main',
                                color: msg.user === userProfile.id ? 'text.primary' : 'common.white',
                            }}
                        >
                            <Typography variant="h6" sx={{ display: 'block', textAlign: 'right', marginTop: 0.5 }}>
                                {msg.user === userProfile.id ? userProfile.username : 'You'}
                            </Typography>
                            <Typography variant="body1">{msg.message}</Typography>
                        </Box>
                    </Box>
                ))}
            </Paper>


            {/* Typing indicator */}
            {typing && (
                <Typography
                    variant="body2"
                    sx={{ fontStyle: 'italic', marginBottom: 2 }}
                >
                    {userProfile.username} is typing...
                </Typography>
            )}


            {/* Message input and send button */}
            <Paper elevation={2} sx={{ padding: 2, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        value={message}
                        onChange={handleInputChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendMessage}
                        sx={{ flexShrink: 0 }}
                    >
                        Send
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ChatPage;
