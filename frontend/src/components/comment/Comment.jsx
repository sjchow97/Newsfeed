import React, { useEffect, useState } from "react";
import "./comment.css";

const Comment = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/");
        const data = await res.json();
        console.log(data);
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Comments:</h2>
      <ul>
        {comments.map((comment) => (
          <div>
            <p key={comment.comment_id}></p>
            <p>{comment.post_title}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};
export default Comment;
