var React = require("react");
require("./PostButtons.css");

var PostButtons = React.createClass({
  handleButtonClick: function (action, id) {
    this.props.onButtonClick(action, id);
  },

  render: function () {
    var {
      userVote,
      like_count,
      dislikes_count,
      uuid,
      article,
      toggleCommentInput,
    } = this.props;

    return (
      <div className="post-buttons">
        {userVote === 1 ? (
          <button onClick={() => this.handleButtonClick("undo", uuid)}>
            Un-like {like_count}
          </button>
        ) : (
          <button onClick={() => this.handleButtonClick("like", uuid)}>
            Like {like_count}
          </button>
        )}
        {userVote === -1 ? (
          <button onClick={() => this.handleButtonClick("undo", uuid)}>
            Un-dislike {dislikes_count}
          </button>
        ) : (
          <button onClick={() => this.handleButtonClick("dislike", uuid)}>
            Dislike {dislikes_count}
          </button>
        )}
        <button onClick={() => toggleCommentInput(article.id)}>Comment</button>
        <button onClick={() => alert("Share functionality to be implemented")}>
          Share
        </button>
      </div>
    );
  },
});

module.exports = PostButtons;
