var React = require("react");
require("./Comment.css");

var Comment = React.createClass({
  render: function () {
    return (
      <div className="comment">
        <p>{this.props.comment.comment}</p>
        <p className="comment-author">{this.props.comment.author}</p>
      </div>
    );
  },
});

module.exports = Comment;
