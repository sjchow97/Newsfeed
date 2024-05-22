// utils.js
import axios from 'axios';

export const getCSRFToken = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/auth/csrf/');
        return response.data.csrfToken;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
    }
};
