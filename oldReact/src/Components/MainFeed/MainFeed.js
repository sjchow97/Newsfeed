var React = require("react");
var Post = require("../Post/Post");
var Pagination = require("../Pagination/Pagination");
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
          this.setState({ totalPages: data.total_pages });
          this.setState({ currentPage: data.current_page });
          console.log(data);
        }.bind(this)
      )
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  },

  handlePageChange: function (pageNumber) {
    this.setState({ currentPage: pageNumber });
  },

  render: function () {
    return (
      <div className="main-feed">
        {this.state.articles.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="posts">
            {this.state.articles.map(function (article, index) {
              return <Post key={index} article={article} />;
            })}
            <div className="pagination-main">
              <Pagination
                totalItems={this.state.articles.length}
                totalPages={this.state.totalPages}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    );
  },
});

module.exports = MainFeed;
