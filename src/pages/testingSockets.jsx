import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const chatSocket = io('http://localhost:3001/chat');

const TestingSockets = () => {
    const [isConnected, setIsConnected] = useState(false);
    const connect = () => {
        chatSocket.on('connect', () => {
            setIsConnected(true);
        });
    }

    useEffect(() => {
        connect();
    }, []);
    return (
        <Box>
            <h1>Testing Sockets</h1>
            <h2>{isConnected ? 'Connected' : 'Not Connected'}</h2>
            {/* display messages, input and send button */}
            <Box>
                <Button onClick={() => {
                    chatSocket.emit('join', {
                        user: 'John',
                        room: 'room1'
                    });
                }}>Join Room</Button>

            </Box>
        </Box>
    );
}

export default TestingSockets;