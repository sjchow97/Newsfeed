import React, { useState } from "react";
import "./Post.css";

function Post({ article, reactionData }) {
  const { published_parsed, title, summary, link, uuid } = article;
  const user_vote = reactionData?.user_vote ?? 0;
  const likes = reactionData?.likes ?? 0;
  const dislikes = reactionData?.dislikes ?? 0;

  const [likeCount, setLikes] = useState(likes);
  const [dislikeCount, setDislikes] = useState(dislikes);
  const [userVote, setUserVote] = useState(user_vote);
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleLike = (id) => {
    fetch(`http://127.0.0.1:8000/api/rss/like_post/${id}/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setUserVote(data.user_vote);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDislike = (id) => {
    fetch(`http://127.0.0.1:8000/api/rss/dislike_post/${id}/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setUserVote(data.user_vote);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleUndo = (id) => {
    fetch(`http://127.0.0.1:8000/api/rss/undo_reaction/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setUserVote(data.user_vote);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const toggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: summary,
        url: link,
      })
      .then(() => console.log('Successfully shared'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div className="post">
      <h1>{title}</h1>
      <p>{new Date(published_parsed).toLocaleDateString()}</p>
      <p>{summary}</p>
      <a href={link} className="link-button" target="_blank" rel="noopener noreferrer">
        Link to article
      </a>
      <div className="post-buttons">
        <label className="container">
          <input
            type="checkbox"
            onClick={() => (userVote === 1 ? handleUndo(uuid) : handleLike(uuid))}
            checked={userVote === 1}
          />
          <svg className="like-svg" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.845,17.099l-2.489,8.725C26.989,27.105,25.804,28,24.473,28H11c-0.553,0-1-0.448-1-1V13c0-0.215,0.069-0.425,0.198-0.597l5.392-7.24C16.188,4.414,17.05,4,17.974,4C19.643,4,21,5.357,21,7.026V12h5.002c1.265,0,2.427,0.579,3.188,1.589C29.954,14.601,30.192,15.88,29.845,17.099z" />
            <path d="M7,12H3c-0.553,0-1,0.448-1,1v14c0,0.552,0.447,1,1,1h4c0.553,0,1-0.448,1-1V13C8,12.448,7.553,12,7,12z M5,25.5c-0.828,0-1.5-0.672-1.5-1.5c0-0.828,0.672-1.5,1.5-1.5c0.828,0,1.5,0.672,1.5,1.5C6.5,24.828,5.828,25.5,5,25.5z" />
          </svg>
        </label>
        <label className="container">
          <input
            type="checkbox"
            onClick={() => (userVote === -1 ? handleUndo(uuid) : handleDislike(uuid))}
            checked={userVote === -1}
          />
          <svg className="dislike-svg" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.156,14.901l2.489-8.725C5.012,4.895,6.197,4,7.528,4h13.473C21.554,4,22,4.448,22,5v14  c0,0.215-0.068,0.425-0.197,0.597l-5.392,7.24C15.813,27.586,14.951,28,14.027,28c-1.669,0-3.026-1.357-3.026-3.026V20H5.999  c-1.265,0-2.427-0.579-3.188-1.589C2.047,17.399,1.809,16.12,2.156,14.901z" />
            <path d="M25.001,20h4C29.554,20,30,19.552,30,19V5c0-0.552-0.446-1-0.999-1h-4c-0.553,0-1,0.448-1,1v14  C24.001,19.552,24.448,20,25.001,20z M27.001,6.5c0.828,0,1.5,0.672,1.5,1.5c0,0.828-0.672,1.5-1.5,1.5c-0.828,0-1.5-0.672-1.5-1.5  C25.501,7.172,26.173,6.5,27.001,6.5z" />
          </svg>
        </label>
        <button onClick={toggleCommentInput}>Comment</button>
        <button onClick={handleShare}>
          Share
        </button>
      </div>
      {showCommentInput && (
        <div>
          <input
            className="comment-in"
            style={{ display: 'block' }}
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
