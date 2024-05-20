// LogoutButton.js
import React from 'react';
import api from '../services/api';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await api.post('/auth/logout/');
            // Handle successful logout (e.g., redirect user)
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
