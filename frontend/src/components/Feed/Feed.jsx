import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import "./Feed.css";

function Feed() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/demo.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data.feed_posts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="posts">
      {articles.length > 0 ? (
        articles.map((item, index) => <Post key={index} article={item} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Feed;
