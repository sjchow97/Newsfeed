var React = require("react");
var AiOutlineComment = require("react-icons/ai").AiOutlineComment;
var AiOutlineEdit = require("react-icons/ai").AiOutlineEdit;
var AiOutlineDelete = require("react-icons/ai").AiOutlineDelete;
require("./Comment.css");

var { editComment, deleteComment } = require("../../utils/commentActions");

var Comment = React.createClass({
  getInitialState: function () {
    return {
      isEditing: false,
      editedContent: this.props.comment.content,
      isReplying: false,
      replyContent: "",
    };
  },

  handleEdit: function (event) {
    event.preventDefault();
    this.setState({ isEditing: true });
  },

  handleCancelEdit: function () {
    this.setState({
      isEditing: false,
      editedContent: this.props.comment.content,
    });
  },

  handleChangeEdit: function (e) {
    this.setState({ editedContent: e.target.value });
  },

  handleSave: function () {
    const token = localStorage.getItem("token");
    const editedComment = {
      ...this.props.comment,
      content: this.state.editedContent,
    };

    editComment(this.props.comment.comment_id, token, editedComment)
      .then((updatedComment) => {
        this.props.onEdit(
          this.props.comment.comment_id,
          this.state.editedContent
        );
        this.setState({ isEditing: false });
      })
      .catch((error) => {
        console.error("Error editing comment:", error);
      });
  },

  handleReply: function (event) {
    event.preventDefault();
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

  handleDelete: function (event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    deleteComment(this.props.comment.comment_id, token)
      .then(() => {
        this.props.onDelete(this.props.comment.comment_id);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
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
        <p id="user-name">{comment.user_name}</p>
        <p id="publication-date">{creationDate}</p>
        <br />
        {this.state.isEditing ? (
          <div className="edit-div">
            <input
              value={this.state.editedContent}
              onChange={this.handleChangeEdit}
              className="edit-in"
            />
            <div className="edit-buttons">
              <button onClick={this.handleSave}>Save</button>
              <button onClick={this.handleCancelEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <p>
              {comment.content}
              {editedDate && <span className="edited"> (Edited)</span>}
            </p>
            <div id="comment-actions">
              {!comment.parent && (
                <a
                  href="#"
                  onClick={this.handleReply}
                  className="reply-link"
                  title="Reply"
                >
                  <AiOutlineComment />
                </a>
              )}
              {showEditLink && (
                <div>
                  <a
                    href="#"
                    onClick={this.handleEdit}
                    className="edit-link"
                    title="Edit"
                  >
                    <AiOutlineEdit />
                  </a>
                  {!comment.replies.length && (
                    <a
                      href="#"
                      onClick={this.handleDelete}
                      className="delete-link"
                      title="Delete"
                    >
                      <AiOutlineDelete />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {this.state.isReplying && (
          <div className="reply-section">
            <input
              value={this.state.replyContent}
              onChange={this.handleChangeReply}
              type="text"
              placeholder="Write a reply..."
              className="reply-in"
            />
            <button onClick={this.handleSaveReply}>Reply</button>
            <button onClick={this.handleCancelReply}>Cancel</button>
          </div>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <div className="replies">
            {comment.replies.map((reply) => (
              <Comment
                key={reply.comment_id}
                comment={reply}
                onDelete={this.props.onDelete}
                onEdit={this.props.onEdit}
                onReply={this.props.onReply}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
});

module.exports = Comment;
