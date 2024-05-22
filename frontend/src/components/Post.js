import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import '../styles/Post.css';

function Post() {
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
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
    <div className="posts">
      {articles.length > 0 ? (
        articles.map((article) => (
          <div className="post" key={article.id}>
            <h1>{article.title}</h1>
            <p>{new Date(article.published_parsed).toLocaleDateString()}</p>
            <p>{article.summary_detail.value}</p>
            <div className="post-buttons">
              <button onClick={() => handleLike(article.id)}>
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
              <button onClick={() => handleDislike(article.id)}>
                <FontAwesomeIcon icon={faThumbsDown} />
              </button>
              <button onClick={() => toggleCommentInput(article.id)}>
                <FontAwesomeIcon icon={faComment} />
              </button>
              <button onClick={() => alert('Share functionality to be implemented')}>
                <FontAwesomeIcon icon={faShare} />
              </button>
            </div>
            {showCommentInput[article.id] && (
              <div>
                <input className="comment-in" type="text" placeholder="Write a comment..." />
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
