var React = require("react");
require("./Comment.css");

var Comment = React.createClass({
  getInitialState: function () {
    return {
      isEditing: false,
      editedContent: this.props.comment.content,
    };
  },

  handleEdit: function () {
    this.setState({ isEditing: true });
  },

  handleCancel: function () {
    this.setState({ isEditing: false });
  },

  handleChange: function (e) {
    this.setState({ editedContent: e.target.value });
  },

  handleSave: function () {
    // Send the edited content to the server and update the comment
    // Here, you would typically make an API call to update the comment content
    // For the sake of simplicity, I'll just update the UI state
    this.setState({ isEditing: false });
    this.props.onEdit(this.props.comment.comment_id, this.state.editedContent);
  },

  render: function () {
    var comment = this.props.comment;
    var creationDate = new Date(comment.creation_date).toLocaleString();
    var editedDate = comment.edited_date
      ? new Date(comment.edited_date).toLocaleString()
      : null;

    // Determine whether to show the edit link based on user identity
    var user = localStorage.getItem("user");
    var userObj = user ? JSON.parse(user) : {};
    const userId = userObj.id;
    var showEditLink = userId === comment.user_id;

    console.log(showEditLink);

    return (
      <div className="comment">
        <p>{comment.user_name}</p>
        <p>{creationDate}</p>
        {this.state.isEditing ? (
          <div>
            <textarea
              value={this.state.editedContent}
              onChange={this.handleChange}
            />
            <button onClick={this.handleSave}>Save</button>
            <button onClick={this.handleCancel}>Cancel</button>
          </div>
        ) : (
          <div>
            <p>
              {comment.content}
              {editedDate && <span className="edited"> (Edited)</span>}
            </p>
            {showEditLink && <button onClick={this.handleEdit}>Edit</button>}
          </div>
        )}
      </div>
    );
  },
});

module.exports = Comment;
