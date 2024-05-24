export function handleLike(id, token) {
  return fetch(`http://127.0.0.1:8000/api/rss/like_post/${id}/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      return response.json().then(body => {
        throw new Error(body.error);
      });
    }
    return response.json();
  });
}

export function handleDislike(id, token) {
  return fetch(`http://127.0.0.1:8000/api/rss/dislike_post/${id}/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      return response.json().then(body => {
        throw new Error(body.error);
      });
    }
    return response.json();
  });
}

export function handleUndo(id, token) {
  return fetch(`http://127.0.0.1:8000/api/rss/undo_reaction/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      return response.json().then(body => {
        throw new Error(body.error);
      });
    }
    return response.json();
  });
}
