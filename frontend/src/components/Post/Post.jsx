import React, { useState } from "react";
import { v5 as uuidv5 } from 'uuid';

const REFERENCE_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

function Post({ article }) {
  const { published_parsed, title, summary, base, link, published } = article;
  const uuid = uuidv5(`${title}`, REFERENCE_NAMESPACE);

  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [showCommentInput, setShowCommentInput] = useState({});

  const handleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: !prevLikes[id] ? 1 : 0,
    }));

    setDislikes((prevDislikes) => ({
      ...prevDislikes,
      [id]: prevDislikes[id] ? 0 : prevDislikes[id],
    }));
  };

  const handleDislike = (id) => {
    setDislikes((prevDislikes) => ({
      ...prevDislikes,
      [id]: !prevDislikes[id] ? 1 : 0,
    }));

    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: prevLikes[id] ? 0 : prevLikes[id],
    }));
  };

  const toggleCommentInput = (id) => {
    setShowCommentInput((prevShowCommentInput) => ({
      ...prevShowCommentInput,
      [id]: !prevShowCommentInput[id],
    }));
  };

  return (
    <div className="post">
      <h1>{title}</h1>
      <p>{new Date(published_parsed).toLocaleDateString()}</p>
      <p>{summary}</p>
      <a href={link}>
        <p>Link to article</p>
      </a>
      <div className="post-buttons">
        <button onClick={() => handleLike(article.id)}>
          {likes[article.id] ? "Unlike" : "Like"} {likes[article.id] || 0}
        </button>
        <button onClick={() => handleDislike(article.id)}>
          {dislikes[article.id] ? "Undislike" : "Dislike"}{" "}
          {dislikes[article.id] || 0}
        </button>
        <button onClick={() => toggleCommentInput(article.id)}>Comment</button>
        <button onClick={() => alert("Share functionality to be implemented")}>
          Share
        </button>
      </div>
      {showCommentInput[article.id] && (
        <div>
          <input
            className="comment-in"
            type="text"
            placeholder="Write a comment..."
          />
          <button className="submit">Post</button>
        </div>
      )}
    </div>
  );
}

export default Post;
