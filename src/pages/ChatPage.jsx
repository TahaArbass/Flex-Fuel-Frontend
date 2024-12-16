import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { useChatSocket } from '../contexts/ChatSocketContext';
import FollowersList from '../components/user/FollowersList';
import { keyframes } from '@mui/system';


/** Chat page component 
 * 
 * This component displays the chat messages between the logged-in user and the selected user.
 * It also displays a typing indicator when the selected user is typing a message.
 * 
 * The user profile is passed to this component via the location state.
 */

const ChatPage = () => {
    const typingDots = keyframes`
    0%, 80%, 100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
`;

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

    // Send a message to the selected user
    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage(userProfile.id, message);
            setMessage(""); // Clear input after sending
            handleTyping(userProfile.id, false); // Stop typing indicator
        }
    };

    // Send a message to the selected user when enter key is pressed
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setMessage(value);
        handleTyping(userProfile.id, value.length > 0);
    };

    return (
        <>
            <Box sx={{ padding: 1, ml: 2, mt: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Chat with {userProfile.username}
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item sm={8}>
                    <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', height: '85vh' }}>
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
                            {/* Display chat messages */}
                            {messages.map((msg, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: msg.user === userProfile.id ? 'flex-start' : 'flex-end',
                                    }}
                                >

                                    {/* Message bubble */}
                                    <Box
                                        sx={{
                                            maxWidth: '70%',
                                            padding: 1,
                                            borderRadius: 2,
                                            bgcolor: msg.user === userProfile.id ? 'warning.main' : 'primary.main',
                                            color: msg.user === userProfile.id ? 'text.primary' : 'common.white',
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ display: 'block', textAlign: msg.user === userProfile.id ? "left" : "right", marginTop: 0.5 }}>
                                            {msg.user === userProfile.id ? userProfile.username : 'You'}
                                        </Typography>
                                        <Typography variant="body1">{msg.message}</Typography>
                                    </Box>
                                </Box>
                            ))}

                            {/* Typing indicator */}
                            {typing && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontStyle: 'italic',
                                        marginBottom: 2,
                                        color: 'primary.main', // theme color for consistency
                                        fontWeight: 500, // slightly bolder
                                        position: 'relative', // For animations
                                        '&::after': {
                                            content: '""',
                                            display: 'inline-block',
                                            width: '6px',
                                            height: '6px',
                                            marginLeft: '6px',
                                            borderRadius: '50%',
                                            backgroundColor: 'primary.main',
                                            animation: `${typingDots} 1.5s infinite ease-in-out`,
                                        },
                                    }}
                                >
                                    {userProfile.username} is typing
                                </Typography>
                            )}
                        </Paper>

                        {/* Message input and send button */}
                        <Paper elevation={2} sx={{ padding: 2, borderRadius: 2 }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
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
                </Grid>
                {/* Followers list section */}
                <Grid item sm={4} xs={12}>
                    <FollowersList />
                </Grid>
            </Grid>
        </>
    );
};

export default ChatPage;
