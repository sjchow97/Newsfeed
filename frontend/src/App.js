import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';
import postImage from './postImage.png'; // Demo location for the post image

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Sidebar />
        <NewsFeed />
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <div className="nav-buttons">
        <button>Explore Topics</button>
        <button>Start a Conversation</button>
        <button>Home</button>
      </div>
      <div className="profile-notifications">
        <button className="notifications-button">Notifications</button>
        <div className="profile">
          <img src={logo} alt="profile" />
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <a href="#">Dashboard</a>
      <a href="#">Topics</a>
      <a href="#">Neighbourhood</a>
      <a href="#">News</a>
      <a href="#">Explore</a>
      <a href="#">Settings</a>
    </div>
  );
}

function NewsFeed() {
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
    <div className="news-feed">
      <h1>Why deathbed dreams and visions can be a comfort for the dying — and those left behind</h1>
      <p>Charlotte didn't seem afraid, but peaceful, and perhaps even happy, Cynthia said. The two women had spent the evening together at Toronto Grace Health Centre, and Cynthia remembers Charlotte being alert. They'd completed a crossword puzzle together and watched the Blue Jays game — even singing along to Take Me Out to the Ball Game.</p>
      <img src={postImage} alt="Post" className="post-image" />
      <div className="post-buttons">
        <button onClick={handleLike}>{isLiked ? 'Unlike' : 'Like'}  {likes}</button>
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

export default App;
