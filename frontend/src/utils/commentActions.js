export function createComment(postId, token, comment) {
  return fetch(`http://127.0.0.1:8000/api/rss/post_comment/`, {
    method: "CREATE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      post_title: comment.title,
      content: comment.content,
      post_reference: {
        reference_id: postId,
      },
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

export function deleteComment(commentId, token) {
  return fetch(`http://127.0.0.1:8000/api/rss/delete_comment/${commentId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}
