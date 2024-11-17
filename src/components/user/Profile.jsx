// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Avatar, Grid, CircularProgress } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import UserService from '../../services/user.service';

const Profile = ({ profileUsername }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    // Get the logged-in user's info from context
    const { auth } = useAuth();
    const currentUser = auth.user;

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
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        if (profileUsername) {
            fetchProfile();
        }
    }, [profileUsername, currentUser.id]);

    // Handle follow button
    const handleFollow = () => {
        alert('Follow button clicked!');
    };

    // Handle edit button
    const handleEditProfile = () => {
        alert('Edit profile button clicked!');
    };

    if (!userProfile) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
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
                    <Button variant="contained" color="primary" onClick={handleEditProfile} sx={{ width: 200 }}>
                        Edit Profile
                    </Button>
                ) : (
                    <Button variant="outlined" color="primary" onClick={handleFollow} sx={{ width: 200 }}>
                        Follow
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default Profile;
