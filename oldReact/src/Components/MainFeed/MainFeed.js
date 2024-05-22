var React = require("react");
var Post = require("../Post/Post");
require("./MainFeed.css");

var MainFeed = React.createClass({
  getInitialState: function () {
    return {
      articles: [],
      currentPage: 1,
      totalPages: 1,
    };
  },

  componentDidMount: function () {
    var token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/api/rss/read_feeds/", {
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
          this.setState({ articles: data.feed_posts });
        }.bind(this)
      )
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  },

  render: function () {
    return (
      <div className="posts">
        {this.state.articles.length > 0 ? (
          this.state.articles.map(function (item, index) {
            return <Post key={index} article={item} />;
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  },
});

module.exports = MainFeed;
