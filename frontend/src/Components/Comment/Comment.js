var React = require("react");
require("./Comment.css");

var {
  createComment,
  replyToComment,
  editComment,
  deleteComment,
} = require("../../utils/commentActions");

var Comment = React.createClass({
  getInitialState: function () {
    return {
      isEditing: false,
      editedContent: this.props.comment.content,
      isReplying: false,
      replyContent: "",
    };
  },

  handleEdit: function () {
    this.setState({ isEditing: true });
  },

  handleCancelEdit: function () {
    this.setState({ isEditing: false });
  },

  handleChangeEdit: function (e) {
    this.setState({ editedContent: e.target.value });
  },

  handleSave: function () {
    this.setState({ isEditing: false });
    this.props.onEdit(this.props.comment.comment_id, this.state.editedContent);
  },

  handleReply: function () {
    this.setState({ isReplying: true });
  },

  handleCancelReply: function () {
    this.setState({ isReplying: false, replyContent: "" });
  },

  handleChangeReply: function (e) {
    this.setState({ replyContent: e.target.value });
  },

  handleSaveReply: function () {
    this.props.onReply(this.props.comment.comment_id, this.state.replyContent);
    this.setState({ isReplying: false, replyContent: "" });
  },

  handleDelete: function () {
    const token = localStorage.getItem("token");
    deleteComment(this.props.comment.comment_id, token);
  },

  render: function () {
    var comment = this.props.comment;
    var creationDate = new Date(comment.creation_date).toLocaleString();
    var editedDate = comment.edited_date
      ? new Date(comment.edited_date).toLocaleString()
      : null;

    var user = localStorage.getItem("user");
    var userObj = user ? JSON.parse(user) : {};
    var userId = userObj.id;
    var showEditLink = userId === comment.user;

    return (
      <div className="comment">
        <p>{comment.user_name}</p>
        <p>{creationDate}</p>
        {this.state.isEditing ? (
          <div>
            <textarea
              value={this.state.editedContent}
              onChange={this.handleChangeEdit}
            />
            <button onClick={this.handleSave}>Save</button>
            <button onClick={this.handleCancelEdit}>Cancel</button>
          </div>
        ) : (
          <div>
            <p>
              {comment.content}
              {editedDate && <span className="edited"> (Edited)</span>}
            </p>
            {showEditLink && (
              <div>
                <a href="#" onClick={this.handleEdit} className="edit-link">
                  Edit
                </a>
                <a href="#" onClick={this.handleDelete} className="delete-link">
                  Delete
                </a>
              </div>
            )}
            <a href="#" onClick={this.handleReply} className="reply-link">
              Reply
            </a>
          </div>
        )}
        {this.state.isReplying && (
          <div className="reply-section">
            <textarea
              value={this.state.replyContent}
              onChange={this.handleChangeReply}
            />
            <button onClick={this.handleSaveReply}>Reply</button>
            <button onClick={this.handleCancelReply}>Cancel</button>
          </div>
        )}
      </div>
    );
  },
});

module.exports = Comment;
