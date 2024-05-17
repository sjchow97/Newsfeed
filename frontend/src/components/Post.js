import React, { useState } from 'react';
import postImage from '../Images/postImage.png';
import '../styles/Post.css';

function Post() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);

  function handleLike() {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  }

  function toggleCommentInput() {
    setShowCommentInput(!showCommentInput);
  }

  return (
    <div className="post">
      <h1>Why deathbed dreams and visions can be a comfort for the dying — and those left behind</h1>
      <p>Charlotte didn't seem afraid, but peaceful, and perhaps even happy, Cynthia said. The two women had spent the evening together at Toronto Grace Health Centre, and Cynthia remembers Charlotte being alert. They'd completed a crossword puzzle together and watched the Blue Jays game — even singing along to Take Me Out to the Ball Game.</p>
      <img src={postImage} alt="Post" className="post-image" />
      <div className="post-buttons">
        <button onClick={handleLike}>{isLiked ? 'Unlike' : 'Like'} {likes}</button>
        <button onClick={toggleCommentInput}>Comment</button>
        <button onClick={() => alert('Share functionality to be implemented')}>Share</button>
      </div>
      {showCommentInput && (
        <div className="comment-input">
          <input type="text" placeholder="Write a comment..." />
          <button>Post</button>
        </div>
      )}
    </div>
  );
}

export default Post;
