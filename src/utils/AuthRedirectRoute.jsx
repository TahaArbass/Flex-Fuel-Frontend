import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import MuscleGroupService from '../services/muscleGroup.service';
import { notifyError } from './toastNotification';
import PrivateLayout from '../components/layouts/privateLayout';
import { useAuth } from '../contexts/AuthContext';

const AuthRedirectRoute = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // `null` means loading
    const location = useLocation(); // Access current location to store `next`

    const { logout } = useAuth();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Make an authenticated API call
                await MuscleGroupService.getAll();
                setIsAuthenticated(true);
            } catch (error) {
                if (error.response?.status === 401) {
                    notifyError(error?.response?.data?.message || 'Unauthorized. Please login to continue');
                    logout();
                    setIsAuthenticated(false);
                }
            }
        };

        checkAuth();
    }, []);

    // Show loading spinner or fallback while checking
    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Replace with your loading component
    }

    // If user is authenticated, show the requested element
    if (isAuthenticated) {
        return (
            <>
                <PrivateLayout>
                    {element}
                </PrivateLayout>
            </>
        )
    }

    // If user is not authenticated, redirect to login and pass `next` parameter
    return <Navigate to={`/login?next=${location.pathname}`} replace />;
};

export default AuthRedirectRoute;
