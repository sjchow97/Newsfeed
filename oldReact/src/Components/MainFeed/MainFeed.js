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
      loading: true, // Initialize the loading state
    };
  },

  componentDidMount: function () {
    this.fetchArticles(this.state.currentPage);
  },

  fetchArticles: function (pageNumber) {
    this.setState({ loading: true }); // Set loading state to true before fetching
    var token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/api/rss/read_feeds/?page=" + pageNumber, {
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
            articles: data.feed_posts,
            totalPages: data.total_pages,
            currentPage: data.current_page,
            loading: false, // Set loading state to false after fetching
          });
        }.bind(this)
      )
      .catch(
        function (error) {
          console.error("Error fetching data:", error);
          this.setState({ loading: false }); // Set loading state to false on error
        }.bind(this)
      );
  },

  handlePageChange: function (pageNumber) {
    this.fetchArticles(pageNumber);
  },

  render: function () {
    return (
      <div className="main-feed">
        {this.state.loading ? (
          <div className="loading">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="posts">
            {this.state.articles.map(function (article, index) {
              return <Post key={index} article={article} />;
            })}
            <div className="pagination-main">
              <Pagination
                currentPage={this.state.currentPage}
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
