import React from "react";
import Navbar from "../Layout/Navbar";
import Sidebar from "../Layout/Sidebar";
import Feed from "./Feed";
import "./FeedPage.css";

const FeedPage = () => {
  return (
    <div className="feed-page">
      <Navbar />
      <div className="content">
        <Sidebar />
        <Feed />
      </div>
    </div>
  );
};
export default FeedPage;
