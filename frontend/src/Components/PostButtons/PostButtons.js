var React = require("react");
var AiOutlineLike = require('react-icons/ai').AiOutlineLike;
var AiFillLike = require('react-icons/ai').AiFillLike ;
var AiOutlineDislike = require('react-icons/ai').AiOutlineDislike;
var AiFillDislike = require('react-icons/ai').AiFillDislike;
var AiOutlineShareAlt = require('react-icons/ai').AiOutlineShareAlt;
var AiOutlineComment  = require('react-icons/ai').AiOutlineComment;
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
      comment_count,
      uuid,
      article,
      toggleCommentInput,
    } = this.props;

    return (
      <div className="post-buttons">
        {userVote === 1 ? (
          <button onClick={() => this.handleButtonClick("undo", uuid)}>
            <AiFillLike color="green"/> {like_count}
          </button>
        ) : (
          <button onClick={() => this.handleButtonClick("like", uuid)}>
            <AiOutlineLike /> {like_count}
          </button>
        )}
        {userVote === -1 ? (
          <button onClick={() => this.handleButtonClick("undo", uuid)}>
            <AiFillDislike color="crimson" /> {dislikes_count}
          </button>
        ) : (
          <button onClick={() => this.handleButtonClick("dislike", uuid)}>
            <AiOutlineDislike /> {dislikes_count}
          </button>
        )}
        <button onClick={() => toggleCommentInput(article.id)}>
          <AiOutlineComment /> {comment_count}
        </button>
        <button onClick={() => alert("Share functionality to be implemented")}>
          <AiOutlineShareAlt />
        </button>
      </div>
    );
  },
});

module.exports = PostButtons;
