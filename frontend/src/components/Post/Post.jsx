import React, { useState } from "react";

function Post({ article, reactionData }) {
  const { published_parsed, title, summary, base, link, published, uuid } = article;
  const user_vote = reactionData?.user_vote ?? 0;
  const likes = reactionData?.likes ?? 0;
  const dislikes = reactionData?.dislikes ?? 0;

  const [like_count, setLikes] = useState(likes);
  const [dislike_count, setDislikes] = useState(dislikes);
  const [userVote, setUserVote] = useState(user_vote);
  const [showCommentInput, setShowCommentInput] = useState({});

  const handleLike = (id) => {
    fetch(`http://127.0.0.1:8000/api/rss/like_post/${id}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.error);
        }
        return response.json();
      })
      .then((data) => {
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setUserVote(data.user_vote);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDislike = (id) => {
    fetch(`http://127.0.0.1:8000/api/rss/dislike_post/${id}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.error);
        }
        return response.json();
      })
      .then((data) => {
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setUserVote(data.user_vote);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleUndo = (id) => {
    fetch(`http://127.0.0.1:8000/api/rss/undo_reaction/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.error);
        }
        return response.json();
      })
      .then((data) => {
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setUserVote(data.user_vote);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
        {userVote === 1 ? (
          <button onClick={() => handleUndo(uuid)}>
            Un-like {like_count}
          </button>
        ) : (
          <button onClick={() => handleLike(uuid)}>
            Like {like_count}
          </button>
        )}
        {userVote === -1 ? (
          <button onClick={() => handleUndo(uuid)}>
            Un-dislike {dislike_count}
          </button>
        ) : (
          <button onClick={() => handleDislike(uuid)}>
            Dislike {dislike_count}
          </button>
        )}
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