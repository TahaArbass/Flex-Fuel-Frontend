import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Typography, List, ListItem, ListItemAvatar, Avatar, Pagination, Paper } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext'; // this context to get the current user
import { notifyError } from '../../utils/toastNotification';
import FollowerService from '../../services/follower.service'; // service for fetching followers

const FollowersList = () => {
    const { auth } = useAuth(); // Get the current user from the auth context
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const usersPerPage = 10; // Define how many users per page
    const navigate = useNavigate();

    // Fetch all users once when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await FollowerService.getFollowersInfo(auth?.user?.id);
                setUsers(response.data);
                setFilteredUsers(response.data); // Initially set filtered users to all users
            } catch (error) {
                notifyError(error?.response?.data?.error?.message || 'Failed to fetch users');
            }
        };

        fetchUsers();
    }, []);

    // Filter users based on the search query and exclude the current user
    useEffect(() => {
        if (searchQuery) {
            const filtered = users.filter(
                (user) =>
                    user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    user.id !== auth?.user?.id // Exclude the current user by checking ID
            );
            setFilteredUsers(filtered);
        } else {
            // Exclude the current user and show all others
            const filtered = users.filter((user) => user.id !== auth?.user.id);
            setFilteredUsers(filtered);
        }
    }, [searchQuery, users, auth?.userId]);

    // Pagination logic: slice the filtered users to display a page
    const paginatedUsers = useMemo(() => {
        const startIndex = (page - 1) * usersPerPage;
        const endIndex = startIndex + usersPerPage;
        return filteredUsers.slice(startIndex, endIndex);
    }, [filteredUsers, page]);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage); // Total number of pages

    return (
        <Box sx={{ maxWidth: '100%', margin: 'auto', padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 2, width: { xs: '90%', md: '70%' } }}>
                {/* Search Bar */}
                <TextField
                    label="Search Followers"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ marginBottom: 2, width: '30%' }}
                />

                {/* User List */}
                <List>
                    {paginatedUsers.map((user) => (
                        <ListItem key={user.id} onClick={() => navigate(`/profile/${user.username}`)}>
                            <ListItemAvatar>
                                <Avatar alt={user.username} src={user.profilePictureUrl} />
                            </ListItemAvatar>
                            <Typography>{user.username}</Typography>
                        </ListItem>
                    ))}
                </List>

                {/* Pagination */}
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    variant="outlined"
                    shape="rounded"
                    sx={{ marginTop: 2 }}
                />
            </Paper>
        </Box>
    );
};

export default FollowersList;
