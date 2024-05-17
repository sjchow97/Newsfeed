import React from 'react';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <a href="#">Dashboard</a>
      <a href="#">Topics</a>
      <a href="#">Neighbourhood</a>
      <a href="#">News</a>
      <a href="#">Explore</a>
      <a href="#">Settings</a>
    </div>
  );
}

export default Sidebar;
