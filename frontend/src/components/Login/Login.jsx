import React, { useState, useEffect } from "react";
import "./Login.css";
import { getCSRFToken } from "../../services/utils";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login/",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // Handle successful login (e.g., redirect user)
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="button" type="submit">
          Login
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
