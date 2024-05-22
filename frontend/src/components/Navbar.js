import React, { useState } from 'react';
import logo from '../Images/logo.png';
import '../styles/Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <div className={`nav-buttons ${isMenuOpen ? 'open' : ''}`}>
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
      <button className="hamburger" onClick={toggleMenu}>
        &#9776;
      </button>
    </div>
  );
}

export default Navbar;
