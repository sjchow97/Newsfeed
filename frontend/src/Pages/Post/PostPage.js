var React = require("react");
var Navbar = require("../../Components/Layout/Navbar");
var Sidebar = require("../../Components/Layout/Sidebar");
var IndividualPost = require("../../Components/IndividualPost/IndividualPost");
require("./PostPage.css");

var PostPage = React.createClass({
  render: function () {
    return (
      <div className="post-page">
        <Navbar />
        <div className="content">
          <Sidebar />
          <IndividualPost />
        </div>
      </div>
    );
  },
});

module.exports = PostPage;
