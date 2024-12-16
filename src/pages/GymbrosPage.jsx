import React from "react";
import UserList from "../components/user/UsersList";
import FollowersList from "../components/user/FollowersList";
import { Box } from "@mui/material";
const GymbrosPage = () => {
    return (
        <Box>
            <FollowersList />
            <UserList />
        </Box>
    );
}

export default GymbrosPage;
