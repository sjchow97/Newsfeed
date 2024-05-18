import React, { useState, useEffect } from 'react';
import '../styles/Post.css';

function Post() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [dislikes, setDislikes] = useState(0);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch('/demo.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setArticle(data.feed_posts[0]);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  function handleLike() {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
      if (isDisliked) {
        setDislikes(dislikes - 1);
        setIsDisliked(false);
      }
    }
    setIsLiked(!isLiked);
  }

  function handleDislike() {
    if (isDisliked) {
      setDislikes(dislikes - 1);
    } else {
      setDislikes(dislikes + 1);
      if (isLiked) {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    }
    setIsDisliked(!isDisliked);
  }

  function toggleCommentInput() {
    setShowCommentInput(!showCommentInput);
  }

  return (
    <div className="post">
      {article ? (
        <>
          <h1>{article.title}</h1>
          <p>{new Date(article.published_parsed).toLocaleDateString()}</p>
          <p>{article.summary_detail.value}</p>
          <div className="post-buttons">
            <button onClick={handleLike}>{isLiked ? 'Unlike' : 'Like'} {likes}</button>
            <button onClick={handleDislike}>{isDisliked ? 'Undislike' : 'Dislike'} {dislikes}</button>
            <button onClick={toggleCommentInput}>Comment</button>
            <button onClick={() => alert('Share functionality to be implemented')}>Share</button>
          </div>
          {showCommentInput && (
            <div className="comment-input">
              <input type="text" placeholder="Write a comment..." />
              <button>Post</button>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Post;
