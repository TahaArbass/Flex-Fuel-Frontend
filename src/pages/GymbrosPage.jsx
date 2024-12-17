import React, { useEffect } from "react";
import UserList from "../components/user/UsersList";
import FollowersList from "../components/user/FollowersList";
import { Box, Typography } from "@mui/material";
import { useChatSocket } from "../contexts/ChatSocketContext";

// GymbrosPage to show the number of users online, followers, and users list
const GymbrosPage = () => {
    const { getOnlineUsers, countOnlineUsers } = useChatSocket();

    useEffect(() => {
        const interval = setInterval(getOnlineUsers, 3000); // 10 seconds
        return () => clearInterval(interval);
    }, [getOnlineUsers]);

    return (
        <Box>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom> Online Users: {countOnlineUsers}</Typography>
            </Box>
            <FollowersList />
            <UserList />
        </Box>
    );
};

export default GymbrosPage;
