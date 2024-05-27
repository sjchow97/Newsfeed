export async function createComment(postId, token, comment) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/rss/post_comment/`,
      {
        method: "POST",
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
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

export async function replyToComment(commentId, token, comment) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/rss/reply/${commentId}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          post_title: comment.title,
          content: comment.content,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error replying to comment:", error);
    throw error;
  }
}

export async function editComment(commentId, token, comment) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/rss/edit_comment/${commentId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          content: comment.content,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error editing comment:", error);
    throw error;
  }
}

export async function deleteComment(commentId, token) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/rss/delete_comment/${commentId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}
