import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "../Post/Post";
import "./FeedPage.css";

function FeedPage() {
  const [articles, setArticles] = useState([]);
  const [reactions, setReactions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
  }, []);

  return (
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
  );
}

export default FeedPage;