var React = require("react");
var Navbar = require("../../Components/Layout/Navbar");
var Sidebar = require("../../Components/Layout/Sidebar");
var MainFeed = require("../../Components/MainFeed/MainFeed");
require("./FeedPage.css");

var FeedPageLayout = React.createClass({
  render: function () {
    return (
      <div className="feed-page">
        <Navbar />
        <div className="content">
          <Sidebar />
          <MainFeed />
        </div>
      </div>
    );
  },
});

module.exports = FeedPageLayout;
