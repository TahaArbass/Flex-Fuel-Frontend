// logout button component

import React from 'react';

import { Button } from '@mui/material';

import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;