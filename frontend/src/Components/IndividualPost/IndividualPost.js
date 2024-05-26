var React = require("react");
var CommentList = require("../Comment/CommentList");
var PostButtons = require("../PostButtons/PostButtons");
require("./IndividualPost.css");

var { 
  createComment,
  replyToComment
} = require("../../utils/commentActions");

var {
  handleLike,
  handleDislike,
  handleUndo,
} = require("../../utils/postActions");

var IndividualPost = React.createClass({
  getInitialState: function () {
    return {
      post: {},
      comments: [],
      showCommentInput: {},
      likes: 0,
      dislikes: 0,
      loading: true,
      userVote: 0,
      newComment: "",
    };
  },

  componentDidMount: function () {
    this.fetchPost();
  },

  nestComments: function (comments) {
    var commentMap = {};
    comments.forEach(function (comment) {
      comment.replies = [];
      commentMap[comment.comment_id] = comment;
    });
    var nestedComments = [];
    comments.forEach(function (comment) {
      if (comment.parent) {
        commentMap[comment.parent].replies.push(comment);
      } else {
        nestedComments.push(comment);
      }
    });
    return nestedComments;
  },

  fetchPost: function () {
    this.setState({ loading: true });
    var token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/api/rss/${this.props.uuid}/`, {
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(
        function (data) {
          console.log(this.nestComments(data.post_comments)); // Nest comments
          console.log(data);
          this.setState({
            post: data.feed_posts[0],
            likes: data.post_reactions.likes,
            dislikes: data.post_reactions.dislikes,
            comments: this.nestComments(data.post_comments),
            userVote: data.post_reactions.user_vote, // Set userVote from data
            loading: false,
          });
        }.bind(this)
      )
      .catch(
        function (error) {
          console.error("Error fetching data:", error);
          this.setState({ loading: false });
        }.bind(this)
      );
  },

  handleLike: function (id) {
    const token = localStorage.getItem("token");
    handleLike(id, token)
      .then((data) => {
        this.setState({
          likes: data.likes,
          dislikes: data.dislikes,
          userVote: data.user_vote,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  handleDislike: function (id) {
    const token = localStorage.getItem("token");
    handleDislike(id, token)
      .then((data) => {
        this.setState({
          likes: data.likes,
          dislikes: data.dislikes,
          userVote: data.user_vote,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  handleUndo: function (id) {
    const token = localStorage.getItem("token");
    handleUndo(id, token)
      .then((data) => {
        this.setState({
          likes: data.likes,
          dislikes: data.dislikes,
          userVote: data.user_vote,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  handleDeleteComment: function (commentId) {
    this.setState((prevState) => ({
      comments: prevState.comments.filter(
        (comment) => comment.comment_id !== commentId
      ),
    }));
    window.location.reload();
  },

  handleEditComment: function (commentId, editedContent) {
    this.setState((prevState) => ({
      comments: prevState.comments.map((comment) =>
        comment.comment_id === commentId
          ? {
              ...comment,
              content: editedContent,
              edited_date: new Date().toISOString(),
            }
          : comment
      ),
    }));
  },

  handleReplyToComment: function (commentId, replyContent) {
    const token = localStorage.getItem("token");
    const comment = {
      content: replyContent,
    };

    replyToComment(commentId, token, comment)
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
      });
  },

  toggleCommentInput: function (id) {
    this.setState((prevState) => ({
      showCommentInput: {
        ...prevState.showCommentInput,
        [id]: !prevState.showCommentInput[id],
      },
    }));
  },

  handleCommentChange: function (e) {
    this.setState({ newComment: e.target.value });
  },

  handleCommentSubmit: function (postId) {
    const token = localStorage.getItem("token");
    const comment = {
      content: this.state.newComment,
      post_reference: { reference_id: postId },
    };

    createComment(postId, token, comment)
      .then((data) => {
        this.setState({ newComment: "" });
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
      });
  },

  render: function () {
    return (
      <div className="individual-post">
        {this.state.loading ? (
          <div className="loading">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="post-container">
            <div className="post-info">
              <h1>{this.state.post.title}</h1>
              <p>
                {new Date(
                  this.state.post.published_parsed
                ).toLocaleDateString()}
              </p>
              <p>{this.state.post.summary}</p>
              <div className="image-container">
                <img
                  src={this.state.post.image}
                  alt={this.state.post.title}
                  className="post-image"
                />
              </div>
              <a href={this.state.post.link}>
                <p>Link to article</p>
              </a>
              <PostButtons
                userVote={this.state.userVote}
                like_count={this.state.likes}
                dislikes_count={this.state.dislikes}
                comment_count={this.state.post.comment_count}
                uuid={this.props.uuid}
                article={this.state.post}
                onButtonClick={(action, id) => {
                  if (action === "like") this.handleLike(id);
                  if (action === "dislike") this.handleDislike(id);
                  if (action === "undo") this.handleUndo(id);
                }}
                toggleCommentInput={this.toggleCommentInput}
              />
              {this.state.showCommentInput && (
                <div>
                  <input
                    className="comment-in"
                    type="text"
                    placeholder="Write a comment..."
                    value={this.state.newComment}
                    onChange={this.handleCommentChange}
                  />
                  <button
                    className="submit"
                    onClick={() => this.handleCommentSubmit(this.props.uuid)}
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
            <div className="comments">
              <CommentList
                comments={this.state.comments}
                onDelete={this.handleDeleteComment}
                onEdit={this.handleEditComment}
                onReply={this.handleReplyToComment}
              />
            </div>
          </div>
        )}
      </div>
    );
  },
});

module.exports = IndividualPost;
