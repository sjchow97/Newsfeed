var React = require("react");
require("./Navbar.css");
var logo = require("../../Images/logo.png");

var Navbar = React.createClass({
  render: function () {
    return React.createElement(
      "div",
      { className: "navbar" },
      <img src={logo.default} alt="logo" className="logo" />,
      React.createElement(
        "div",
        { className: "nav-buttons" },
        React.createElement("button", null, "Explore Topics"),
        React.createElement("button", null, "Start a Conversation"),
        React.createElement("button", null, "Home")
      ),
      React.createElement(
        "div",
        { className: "profile-notifications" },
        React.createElement(
          "button",
          { className: "notifications-button" },
          "Notifications"
        ),
        React.createElement(
          "div",
          { className: "profile" },
          React.createElement("img", { src: logo, alt: "profile" })
        )
      )
    );
  },
});

module.exports = Navbar;
