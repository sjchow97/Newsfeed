export async function handleLike(id, token) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/rss/like_post/${id}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      const body = await response.json();
      throw new Error(body.error);
    }

    return await response.json();
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
}

export async function handleDislike(id, token) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/rss/dislike_post/${id}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      const body = await response.json();
      throw new Error(body.error);
    }

    return await response.json();
  } catch (error) {
    console.error("Error disliking post:", error);
    throw error;
  }
}

export async function handleUndo(id, token) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/rss/undo_reaction/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      const body = await response.json();
      throw new Error(body.error);
    }

    return await response.json();
  } catch (error) {
    console.error("Error undoing reaction:", error);
    throw error;
  }
}
