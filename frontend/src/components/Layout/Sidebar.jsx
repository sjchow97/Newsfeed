import React from "react";
import LogoutButton from "../LogoutButton";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <a href="#">Dashboard</a>
      <a href="#">Topics</a>
      <a href="#">Neighbourhood</a>
      <a href="#">News</a>
      <a href="#">Explore</a>
      <a href="#">Settings</a>
      <LogoutButton />
    </div>
  );
}

export default Sidebar;