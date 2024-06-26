var React = require("react");
var browserHistory = require("react-router").browserHistory;
var Link = require("react-router").Link;
var PostButtons = require("../PostButtons/PostButtons");

var { createComment } = require("../../utils/commentActions");
var {
  handleLike,
  handleDislike,
  handleUndo,
} = require("../../utils/postActions");

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
      newComment: "",
    };
  },

  handleLike: function (id) {
    const token = localStorage.getItem("token");
    handleLike(id, token)
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
    const token = localStorage.getItem("token");
    handleDislike(id, token)
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
    const token = localStorage.getItem("token");
    handleUndo(id, token)
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

  handleButtonClick: function (action, id) {
    switch (action) {
      case "like":
        this.handleLike(id);
        break;
      case "dislike":
        this.handleDislike(id);
        break;
      case "undo":
        this.handleUndo(id);
        break;
      default:
        break;
    }
  },

  toggleCommentInput: function (id) {
    this.setState((prevState) => ({
      showCommentInput: {
        ...prevState.showCommentInput,
        [id]: !prevState.showCommentInput[id],
      },
    }));
  },

  handleCommentChange: function (e) {
    this.setState({ newComment: e.target.value });
  },

  handleCommentSubmit: function (postId) {
    const token = localStorage.getItem("token");
    const comment = {
      content: this.state.newComment,
      post_reference: { reference_id: postId },
    };

    createComment(postId, token, comment)
      .then((data) => {
        this.setState({ newComment: "" });
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
      });
  },

  handleClick: function () {
    browserHistory.push(`/feed/${this.props.article.uuid}`);
  },

  render: function () {
    var article = this.props.article;
    var published_parsed = article.published_parsed;
    var title = article.title;
    var summary = article.summary;
    var imageUrl = article.image;
    var base = article.base;
    var link = article.link;
    var published = article.published;
    var uuid = article.uuid;
    var commentCount = article.comment_count;

    var like_count = this.state.like_count;
    var dislikes_count = this.state.dislikes_count;
    var userVote = this.state.userVote;
    var showCommentInput = this.state.showCommentInput;
    return (
      <div className="post">
        <div>
          <Link to={`/feed/${uuid}`} className="no-underline">
            <h1>{title}</h1>
          </Link>
          <p>{new Date(published_parsed).toLocaleDateString()}</p>
          <p>{summary}</p>
        </div>
        {imageUrl && (
          <div className="image-container">
            <img src={imageUrl} alt={title} className="post-image" />
          </div>
        )}
        <div className="actions-menu">
          <a href={link} target="_blank" className="no-underline">
            <p>Link to article</p>
          </a>
          <PostButtons
            userVote={userVote}
            like_count={like_count}
            dislikes_count={dislikes_count}
            comment_count={commentCount}
            uuid={uuid}
            article={article}
            onButtonClick={this.handleButtonClick}
            toggleCommentInput={this.toggleCommentInput}
          />
          {showCommentInput[article.id] && (
            <div className="popout-comment">
              <input
                className="comment-in"
                type="text"
                placeholder="Write a comment..."
                value={this.state.newComment}
                onChange={this.handleCommentChange}
              />
              <button
                className="submit"
                onClick={() => this.handleCommentSubmit(article.uuid)}
              >
                Post
              </button>
            </div>
          )}
        </div>
      </div>
    );
  },
});

module.exports = Post;
