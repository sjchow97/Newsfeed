var React = require("react");
var AiOutlineLike = require("react-icons/ai").AiOutlineLike;
var AiFillLike = require("react-icons/ai").AiFillLike;
var AiOutlineDislike = require("react-icons/ai").AiOutlineDislike;
var AiFillDislike = require("react-icons/ai").AiFillDislike;
var AiOutlineShareAlt = require("react-icons/ai").AiOutlineShareAlt;
var AiOutlineComment = require("react-icons/ai").AiOutlineComment;
require("./PostButtons.css");

var PostButtons = React.createClass({
  handleButtonClick: function (action, id) {
    this.props.onButtonClick(action, id);
  },

  handleShare: function () {
    const { article } = this.props;
    const shareData = {
      title: article.title,
      text: article.summary,
      url: article.link,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert(
        "Share not supported on this browser, please copy the link manually."
      );
    }
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

    console.log(like_count, dislikes_count);

    return (
      <div className="post-buttons">
        {userVote === 1 ? (
          <button
            onClick={() => this.handleButtonClick("undo", uuid)}
            title="Undo Like"
          >
            <AiFillLike color="green" /> {like_count}
          </button>
        ) : (
          <button
            onClick={() => this.handleButtonClick("like", uuid)}
            title="Like"
          >
            <AiOutlineLike /> {like_count}
          </button>
        )}
        {userVote === -1 ? (
          <button
            onClick={() => this.handleButtonClick("undo", uuid)}
            title="Undo Dislike"
          >
            <AiFillDislike color="crimson" /> {dislikes_count}
          </button>
        ) : (
          <button
            onClick={() => this.handleButtonClick("dislike", uuid)}
            title="Dislike"
          >
            <AiOutlineDislike /> {dislikes_count}
          </button>
        )}
        <button onClick={() => toggleCommentInput(article.id)} title="Comment">
          <AiOutlineComment /> {comment_count}
        </button>
        <button onClick={this.handleShare} title="Share">
          <AiOutlineShareAlt />
        </button>
      </div>
    );
  },
});

module.exports = PostButtons;
