import React from "react";
import Navbar from "../Layout/Navbar";
import Sidebar from "../Layout/Sidebar";
import FeedPage from "./FeedPage";
import "./FeedPageLayout.css";

const FeedPageLayout = () => {
  return (
    <div className="feed-page">
      <Navbar />
      <div className="content">
        <Sidebar />
        <FeedPage />
      </div>
    </div>
  );
};
export default FeedPageLayout;
