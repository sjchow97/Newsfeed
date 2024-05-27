var React = require("react");
require("./Navbar.css");
var logo = require("../../Images/logo.png");
var profile = require("../../Images/profile.png");

var Navbar = React.createClass({
  getInitialState: function () {
    return { isOpen: false };
  },

  toggleMenu: function () {
    this.setState({ isOpen: !this.state.isOpen });
  },

  render: function () {
    return React.createElement(
      "div",
      { className: "navbar" },
      <img src={logo.default} alt="logo" className="logo" />,
      React.createElement(
        "div",
        { className: `nav-buttons ${this.state.isOpen ? 'open' : ''}` },
        React.createElement("button", null, "Explore Topics"),
        React.createElement("button", null, "Start a Conversation"),
        React.createElement("button", null, "Home")
      ),
      React.createElement(
        "div",
        { className: "profile-notifications" },
        <p><b>{JSON.parse(localStorage.user).name}</b></p>,
        <div className="profile">
          <img src={profile.default} alt="profile" />
        </div>
      ),
      React.createElement(
        "div",
        { className: "navbar-hamburger", onClick: this.toggleMenu },
        React.createElement("span", { className: "bar" }),
        React.createElement("span", { className: "bar" }),
        React.createElement("span", { className: "bar" })
      )
    );
  },
});

module.exports = Navbar;
