// LogoutButton.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      await api.post("/auth/logout/", {}, {
        headers: {
          'Authorization': `Token ${token}` // Include token in Authorization header
        }
      });
      await logout();
      navigate("/");
      // Handle successful logout (e.g., redirect user)
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
