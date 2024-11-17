import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UnauthRedirectRoute = ({ element }) => {
    const { auth } = useAuth();
    const location = useLocation();

    if (auth.loggedIn) {
        // Redirect to a default authenticated route
        return <Navigate to="/exercises" state={{ from: location }} replace />;
    }

    // Render the requested element for unauthenticated users
    return element;
};

export default UnauthRedirectRoute;
