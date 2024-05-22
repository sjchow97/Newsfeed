var React = require("react");
var LogoutButton = require("../LogoutButton");
require("./Sidebar.css");

var Sidebar = React.createClass({
  render: function () {
    return (
      <div className="sidebar">
        <a href="#">Dashboard</a>
        <a href="#">Topics</a>
        <a href="#">Neighbourhood</a>
        <a href="#">News</a>
        <a href="#">Explore</a>
        <a href="#">Settings</a>
        <LogoutButton />
      </div>
    );
  },
});

module.exports = Sidebar;
