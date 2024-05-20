import React from 'react';
import logo from '../Images/logo.png';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <div className="nav-buttons">
        <button>Explore Topics</button>
        <button>Start a Conversation</button>
        <button>Home</button>
      </div>
      <div className="profile-notifications">
        <button className="notifications-button">Notifications</button>
        <div className="profile">
          <img src={logo} alt="profile" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
