import React, { useState } from "react";
import logo from "../../Images/logo.png";
import "./Navbar.css";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <div className={`nav-buttons ${showMenu ? "active" : ""}`}>
        <button>Explore Topics</button>
        <button>Start a Conversation</button>
        <button>Home</button>
      </div>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={`bar ${showMenu ? "open" : ""}`}></div>
      </div>
    </div>
  );
}

export default Navbar;
