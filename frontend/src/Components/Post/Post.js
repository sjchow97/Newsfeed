var React = require("react");
var browserHistory = require("react-router").browserHistory;
require("./Post.css");

var Post = React.createClass({
  getInitialState: function () {
    var likes = 0;
    var dislikes = 0;
    var userVote = null;

    if (this.props.reactionData) {
      likes = this.props.reactionData.likes || 0;
      dislikes = this.props.reactionData.dislikes || 0;
      userVote = this.props.reactionData.user_vote || null;
    }

    return {
      like_count: likes,
      dislikes_count: dislikes,
      showCommentInput: {},
      userVote: userVote,
    };
  },

  handleLike: function (id) {
    fetch(`http://127.0.0.1:8000/api/rss/like_post/${id}/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          like_count: data.likes,
          dislikes_count: data.dislikes,
          userVote: data.user_vote,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  handleDislike: function (id) {
    fetch(`http://127.0.0.1:8000/api/rss/dislike_post/${id}/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          like_count: data.likes,
          dislikes_count: data.dislikes,
          userVote: data.user_vote,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  handleUndo: function (id) {
    fetch(`http://127.0.0.1:8000/api/rss/undo_reaction/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          like_count: data.likes,
          dislikes_count: data.dislikes,
          userVote: data.user_vote,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  toggleCommentInput: function (id) {
    this.setState((prevState) => ({
      showCommentInput: {
        ...prevState.showCommentInput,
        [id]: !prevState.showCommentInput[id],
      },
    }));
  },

  handleClick: function () {
    browserHistory.push(`/feed/${this.props.article.uuid}`);
  },

  render: function () {
    var article = this.props.article;
    var published_parsed = article.published_parsed;
    var title = article.title;
    var summary = article.summary;
    var base = article.base;
    var link = article.link;
    var published = article.published;
    var uuid = article.uuid;

    var like_count = this.state.like_count;
    var dislikes_count = this.state.dislikes_count;
    var userVote = this.state.userVote;
    var showCommentInput = this.state.showCommentInput;

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
            <button onClick={() => this.handleUndo(uuid)}>
              Un-like {like_count}
            </button>
          ) : (
            <button onClick={() => this.handleLike(uuid)}>
              Like {like_count}
            </button>
          )}
          {userVote === -1 ? (
            <button onClick={() => this.handleUndo(uuid)}>
              Un-dislike {dislikes_count}
            </button>
          ) : (
            <button onClick={() => this.handleDislike(uuid)}>
              Dislike {dislikes_count}
            </button>
          )}
          <button onClick={() => this.toggleCommentInput(article.id)}>
            Comment
          </button>
          <button
            onClick={() => alert("Share functionality to be implemented")}
          >
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
  },
});

module.exports = Post;
