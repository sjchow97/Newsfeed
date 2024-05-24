var React = require("react");
var Comment = require("../Comment/Comment");
var PostButtons = require("../PostButtons/PostButtons");
require("./IndividualPost.css");

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
      likes: 0,
      dislikes: 0,
      loading: true,
      userVote: 0,
    };
  },

  componentDidMount: function () {
    this.fetchPost();
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
          this.setState({
            post: data.feed_posts[0],
            likes: data.post_reactions.likes,
            dislikes: data.post_reactions.dislikes,
            comments: data.post_comments,
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

  toggleCommentInput: function (id) {
    this.setState((prevState) => ({
      showCommentInput: {
        ...prevState.showCommentInput,
        [id]: !prevState.showCommentInput[id],
      },
    }));
  },

  render: function () {
    console.log(this.state.comments);
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
              <h3>
                {new Date(
                  this.state.post.published_parsed
                ).toLocaleDateString()}
              </h3>
              <h3>{this.state.post.summary}</h3>
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
                uuid={this.props.uuid}
                article={this.state.post}
                onButtonClick={(action, id) => {
                  if (action === "like") this.handleLike(id);
                  if (action === "dislike") this.handleDislike(id);
                  if (action === "undo") this.handleUndo(id);
                }}
                toggleCommentInput={this.toggleCommentInput}
              />
            </div>
            <div className="comments">
              <ul>
                {this.state.comments.map(function (comment) {
                  return <Comment key={comment.comment_id} comment={comment} />;
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  },
});

module.exports = IndividualPost;
