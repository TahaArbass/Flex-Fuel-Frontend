import React, { useState, useEffect } from "react";
import UserList from "../components/user/UsersList";
import FollowersList from "../components/user/FollowersList";
import { Box, Typography } from "@mui/material";
import { useChatSocket } from "../contexts/ChatSocketContext";
import UserService from "../services/user.service";

// GymbrosPage to show the number of users online, followers, and users list
const GymbrosPage = () => {
    const { getOnlineUsers, countOnlineUsers } = useChatSocket();
    const [usersCount, setUsersCount] = useState(0);
    useEffect(() => {
        // fetch online users
        const interval = setInterval(getOnlineUsers, 2000); // 2 seconds

        // fetch all users count
        fetchCountAllUsers();


        return () => clearInterval(interval);
    }, [getOnlineUsers]);

    const fetchCountAllUsers = async () => {
        try {
            const response = await UserService.countAllUsers();
            setUsersCount(response.data.count);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom> Online Users: {countOnlineUsers}</Typography>
                <Typography variant="h4"> All Users: {usersCount}</Typography>
            </Box>
            <FollowersList />
            <UserList />
        </Box>
    );
};

export default GymbrosPage;
