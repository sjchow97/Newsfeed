var React = require("react");
require("./IndividualPost.css");

var IndividualPost = React.createClass({
  getInitialState: function () {
    return {
      post: {},
      comments: [],
      likes: 0,
      dislikes: 0,
      loading: true,
    };
  },

  componentDidMount: function () {
    this.fetchPost();
  },

  fetchPost: function () {
    this.setState({ loading: true });
    var token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/api/rss/${this.props.uuid}`, {
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

  render: function () {
    return (
      <div className="individual-post">
        {this.state.loading ? (
          <div className="loading">
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            <h1>{this.state.post.title}</h1>
            <p>{this.state.post.content}</p>
            <div className="reactions">
              <button className="like">Like</button>
              <p>{this.state.likes}</p>
              <button className="dislike">Dislike</button>
              <p>{this.state.dislikes}</p>
            </div>
            <h2>Comments</h2>
            <ul>
              {this.state.comments.map(function (comment) {
                return (
                  <li key={comment.id}>
                    <p>{comment.content}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  },
});
module.exports = IndividualPost;
