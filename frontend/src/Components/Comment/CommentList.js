var React = require("react");
var Comment = require("./Comment");

var CommentList = React.createClass({
  render: function () {
    var comments = this.props.comments;
    return (
      <div className="comment-list">
        {comments.map(function (comment) {
          return (
            <Comment
              key={comment.comment_id}
              comment={comment}
              onDelete={this.props.onDelete}
              onEdit={this.props.onEdit}
              onReply={this.props.onReply}
            />
          );
        }.bind(this))}
      </div>
    );
  }
});

module.exports = CommentList;
