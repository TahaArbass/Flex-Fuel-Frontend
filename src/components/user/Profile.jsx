// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Avatar, Grid, CircularProgress, Paper } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import UserService from '../../services/user.service';
import LogoutButton from '../buttons/LogoutButton';
import FollowerService from '../../services/follower.service';
import { notifyError } from '../../utils/toastNotification';
import { useNavigate } from 'react-router-dom';
const Profile = ({ profileUsername }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    // Get the logged-in user's info from context
    const { auth } = useAuth();
    const currentUser = auth.user;
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch profile data here (replace with your API call)
        const fetchProfile = async () => {
            try {
                const response = await UserService.getByUsername(profileUsername);
                const data = response.data;
                setUserProfile(data);
                // Check if the profile is the current user's
                if (data.id === currentUser.id) {
                    setIsOwnProfile(true);
                }

                // Check if the current user is following the profile user
                const isFollowingResponse = await FollowerService.isFollowing(currentUser.id, data.id);
                setIsFollowing(isFollowingResponse.data?.isFollowing);
            } catch (error) {
                notifyError(error?.response?.data?.error?.message || 'Failed to fetch user profile');
            }
        };

        if (profileUsername) {
            fetchProfile();
        }
    }, [profileUsername, currentUser.id]);

    // Handle follow button
    const handleFollow = async () => {
        // follow the user
        try {
            // check if he is already following the user
            const response = await FollowerService.isFollowing(currentUser.id, userProfile.id);
            FollowerService.createFollower({ follower_id: currentUser.id, following_id: userProfile.id });
        }
        catch (error) {
            notifyError(error?.response?.data?.error?.message || 'Failed to follow user');
        }
    };


    // Handle message button
    const handleMessage = () => {
        alert('Message button clicked!');

        navigate(`/chat`, { state: { userProfile } });

    };


    // Handle edit button
    const handleEditProfile = () => {
        alert('Edit profile button clicked!');
    };

    // Loading state
    if (!userProfile) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
                {/* Profile Header */}
                <Typography variant="h4" gutterBottom align="center">
                    {userProfile.username}'s Profile
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {/* Profile Avatar & Info */}
                    <Grid item xs={12} sm={4} container justifyContent="center">
                        <Avatar
                            src={userProfile.profilePicture}
                            alt={userProfile.username}
                            sx={{
                                width: 120,
                                height: 120,
                                borderRadius: '50%',
                                border: '2px solid #fff', // Add border around avatar
                                boxShadow: 3, // Add subtle shadow
                            }}
                        />
                    </Grid>

                    {/* User Info */}
                    <Grid item xs={12} sm={8}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="h6" align="center">
                                {userProfile.username}
                            </Typography>
                            {/* Optional: Display more user information */}
                            <Typography variant="body1" align="center" color="text.secondary">
                                {userProfile.bio || 'No bio available'}
                            </Typography>
                            <Typography variant="body2" align="center" color="text.secondary">
                                {userProfile.email}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Action Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                    {isOwnProfile ? (
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                <Button size='large' variant="contained" color="primary" onClick={handleEditProfile} sx={{ width: 200 }}>
                                    Edit Profile
                                </Button>
                                <LogoutButton />
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                <Button size='large' variant="contained" color="primary" onClick={handleMessage} sx={{ width: 200 }}>
                                    Message
                                </Button>
                                <Button size='large' variant="contained" color="primary" onClick={handleFollow} disabled={isFollowing}
                                    sx={{ width: 200 }}>
                                    {isFollowing ? 'Following' : 'Follow'}
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default Profile;
