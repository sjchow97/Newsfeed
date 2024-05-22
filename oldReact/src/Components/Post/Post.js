var React = require("react");
var useState = require("react").useState;
var uuidv5 = require("uuid").v5;

var REFERENCE_NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

var Post = React.createClass({
  getInitialState: function () {
    return {
      likes: {},
      dislikes: {},
      showCommentInput: {},
    };
  },

  handleLike: function (id) {
    this.setState(function (prevState) {
      var likes = Object.assign({}, prevState.likes);
      var dislikes = Object.assign({}, prevState.dislikes);
      likes[id] = !likes[id] ? 1 : 0;
      dislikes[id] = dislikes[id] ? 0 : dislikes[id];
      return { likes: likes, dislikes: dislikes };
    });
  },

  handleDislike: function (id) {
    this.setState(function (prevState) {
      var likes = Object.assign({}, prevState.likes);
      var dislikes = Object.assign({}, prevState.dislikes);
      dislikes[id] = !dislikes[id] ? 1 : 0;
      likes[id] = likes[id] ? 0 : likes[id];
      return { likes: likes, dislikes: dislikes };
    });
  },

  toggleCommentInput: function (id) {
    this.setState(function (prevState) {
      var showCommentInput = Object.assign({}, prevState.showCommentInput);
      showCommentInput[id] = !showCommentInput[id];
      return { showCommentInput: showCommentInput };
    });
  },

  render: function () {
    var article = this.props.article;
    var published_parsed = article.published_parsed;
    var title = article.title;
    var summary = article.summary;
    var link = article.link;
    var id = article.id;

    var likes = this.state.likes;
    var dislikes = this.state.dislikes;
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
          <button onClick={this.handleLike.bind(this, id)}>
            {likes[id] ? "Unlike" : "Like"} {likes[id] || 0}
          </button>
          <button onClick={this.handleDislike.bind(this, id)}>
            {dislikes[id] ? "Undislike" : "Dislike"} {dislikes[id] || 0}
          </button>
          <button onClick={this.toggleCommentInput.bind(this, id)}>
            Comment
          </button>
          <button
            onClick={() => alert("Share functionality to be implemented")}
          >
            Share
          </button>
        </div>
        {showCommentInput[id] && (
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
