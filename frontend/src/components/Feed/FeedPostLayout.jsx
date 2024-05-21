import React from "react";
import Navbar from "../Layout/Navbar";
import Sidebar from "../Layout/Sidebar";

const FeedPostLayout = () => {
  return (
    <div className="feed-post">
      <Navbar />
      <div className="content">
        <Sidebar />
        {/* put Feedpost component here */}
      </div>
    </div>
  );
};

export default FeedPostLayout;
