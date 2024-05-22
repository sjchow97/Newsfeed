import React, { useState, useEffect } from 'react';
import '../styles/Post.css';

function Post() {
  const [likeCount, setLikeCount] = useState(reactions?.likes || 0);
  const [dislikeCount, setDislikeCount] = useState(reactions?.dislikes || 0);
  const [userVote, setUserVote] = useState(reactions?.user_vote || 0);
  const [showCommentInput, setShowCommentInput] = useState({});
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/demo.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data.feed_posts);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleLike = () => {
    fetch(`/api/like_post/${post.reference_id}/`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        setLikeCount(prev => prev + (userVote === 1 ? 0 : 1));
        setDislikeCount(prev => prev - (userVote === -1 ? 1 : 0));
        setUserVote(1);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDislike = () => {
    fetch(`/api/dislike_post/${post.reference_id}/`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
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
    <div className="posts">
      {articles.length > 0 ? (
        articles.map((article) => (
          <div className="post" key={article.id}>
            <h1>{article.title}</h1>
            <p>{new Date(article.published_parsed).toLocaleDateString()}</p>
            <p>{article.summary_detail.value}</p>
            <div className="post-buttons">
        <button onClick={handleLike} style={{ color: userVote === 1 ? 'blue' : 'black' }}>
          Like {likeCount}
        </button>
        <button onClick={handleDislike} style={{ color: userVote === -1 ? 'red' : 'black' }}>
          Dislike {dislikeCount}
        </button>
              <button onClick={() => toggleCommentInput(article.id)}>Comment</button>
              <button onClick={() => alert('Share functionality to be implemented')}>Share</button>
            </div>
            {showCommentInput[article.id] && (
              <div>
                <input className ="comment-in" type="text" placeholder="Write a comment..." />
                <button className="submit">Post</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Post;
