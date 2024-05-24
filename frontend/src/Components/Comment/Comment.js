var React = require("react");
require("./Comment.css");

var Comment = React.createClass({
  render: function () {
    var comment = this.props.comment;
    var creationDate = new Date(comment.creation_date).toLocaleString();
    var editedDate = comment.edited_date
      ? new Date(comment.edited_date).toLocaleString()
      : null;

    return (
      <div className="comment">
        <p>
          {comment.content}
          {editedDate && <span className="edited"> (Edited)</span>}
        </p>
        <p>
          <strong>Posted by User:</strong> {comment.user}
        </p>
        <p>
          <strong>Posted on:</strong> {creationDate}
        </p>
        {editedDate && (
          <p>
            <strong>Edited on:</strong> {editedDate}
          </p>
        )}
      </div>
    );
  },
});

module.exports = Comment;
