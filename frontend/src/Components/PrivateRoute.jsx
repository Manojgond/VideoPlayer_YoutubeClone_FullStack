import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        // Check authentication status by calling a protected endpoint
        fetch('http://localhost:8000/api/v1/users/auth-check', {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        })
            .then((response) => {
                if (response.status === 401) {
                    setIsAuthenticated(false); // If unauthorized, set state to false
                    navigate('/login'); // Redirect to login page
                }
            })
            .catch((error) => {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
                navigate('/login');
            });
    }, [navigate]);

    return isAuthenticated ? children : null; // Render children if authenticated
};

export default PrivateRoute;
