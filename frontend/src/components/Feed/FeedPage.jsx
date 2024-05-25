import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import Sidebar from "../Layout/Sidebar";
import "./FeedPage.css";

function FeedPage() {
  const [articles, setArticles] = useState([]);
  const [reactions, setReactions] = useState({});
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/rss/read_feeds/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data.feed_posts);
        setReactions(data.post_reactions);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="container">
      {isMobile ? (
        <>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <Sidebar isVisible={isSidebarVisible} />
        </>
      ) : (
        <Sidebar isVisible />
      )}
      <div className="posts">
        {articles.length > 0 ? (
          articles.map((item, index) => (
            <React.Fragment key={index}>
              <Post
                article={item}
                reactionData={item.uuid in reactions ? reactions[item.uuid] : null}
              />
            </React.Fragment>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default FeedPage;
