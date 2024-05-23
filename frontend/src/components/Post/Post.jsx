import React, { useState } from "react";

function Post({ article, reactionData }) {
  const { published_parsed, title, summary, base, link, published, uuid } = article;
  const user_vote = reactionData?.user_vote ?? 0;
  const likes = reactionData?.likes ?? 0;
  const dislikes = reactionData?.dislikes ?? 0;

  const [like_count, setLikes] = useState(likes);
  const [dislikes_count, setDislikes] = useState(dislikes);
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
          throw new Error('Network response was not ok');
        }
        // If you need to do something with the response, you can do it here
        return response.json();
      })
      .then((data) => {
        // Update the state with the new like count
        setLikes(data.likes);
        setDislikes(data.dislikes);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
        <button onClick={() => handleLike(uuid)}>
          {like_count[article.id] ? "Unlike" : "Like"} {like_count}
        </button>
        <button onClick={() => handleDislike(uuid)}>
          {dislikes_count[article.id] ? "Undislike" : "Dislike"}{" "}
          {dislikes_count}
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