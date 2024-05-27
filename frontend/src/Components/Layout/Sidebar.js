var React = require("react");
var LogoutButton = require("../LogoutButton/LogoutButton");
require("./Sidebar.css");

var Sidebar = React.createClass({
  getInitialState: function () {
    return { isOpen: false };
  },

  toggleSidebar: function () {
    this.setState({ isOpen: !this.state.isOpen });
  },

  render: function () {
    return (
      <div className="sidebar-container">
        <button className="sidebar-toggle" onClick={this.toggleSidebar}>
          ☰
        </button>
        <div className={`sidebar ${this.state.isOpen ? 'open' : ''}`}>
          <a href="#">Dashboard</a>
          <a href="#">Topics</a>
          <a href="#">Neighbourhood</a>
          <a href="#">News</a>
          <a href="#">Explore</a>
          <a href="#">Settings</a>
          <LogoutButton />
        </div>
      </div>
    );
  },
});

module.exports = Sidebar;
