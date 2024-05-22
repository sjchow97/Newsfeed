import React, { useState } from "react";
import { v5 as uuidv5 } from 'uuid';

const REFERENCE_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

function Post({ article, reactions }) {
  const { published_parsed, title, summary, base, link, published } = article;
  const uuid = uuidv5(`${title}`, REFERENCE_NAMESPACE);

  const [likeCount, setLikeCount] = useState(reactions.likes);
  const [dislikeCount, setDislikeCount] = useState(reactions.dislikes);
  const [userVote, setUserVote] = useState(reactions.user_vote);
  const [showCommentInput, setShowCommentInput] = useState({});

  const handleLike = () => {
    fetch(`/api/like_post/${uuid}/`, { method: 'POST' })
        .then(response => response.json())
        //.then(data => {
          .then(() => {
            setLikeCount(prev => prev + (userVote === 1 ? 0 : 1));
            setDislikeCount(prev => prev - (userVote === -1 ? 1 : 0));
            setUserVote(1);
        })
        .catch(error => console.error('Error:', error));
  };

  const handleDislike = () => {
    fetch(`/api/dislike_post/${uuid}/`, { method: 'POST' })
        .then(response => response.json())
       // .then(data => {
          .then(() => {
            setDislikeCount(prev => prev + (userVote === -1 ? 0 : 1));
            setLikeCount(prev => prev - (userVote === 1 ? 1 : 0));
            setUserVote(-1);
        })
        .catch(error => console.error('Error:', error));
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
        <button onClick={handleLike} style={{ color: userVote === 1 ? 'blue' : 'black' }}>
          Like {likeCount}
        </button>
        <button onClick={handleDislike} style={{ color: userVote === -1 ? 'red' : 'black' }}>
          Dislike {dislikeCount}
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
