import React, { useEffect, useState } from "react";

const Comment = () => {
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/");
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.comment_id}>
          <h1>{comment.post_title}</h1>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};
export default Comment;
