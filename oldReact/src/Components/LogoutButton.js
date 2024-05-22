var React = require("react");
var useAuth = require("../Context/AuthContext").useAuth;
var api = require("../services/api");

var LogoutButton = React.createClass({
  handleLogout: function () {
    var logout = useAuth().logout;

    try {
      var token = localStorage.getItem("token"); // Get token from localStorage
      api
        .post(
          "/auth/logout/",
          {},
          {
            headers: {
              Authorization: "Token " + token, // Include token in Authorization header
            },
          }
        )
        .then(function () {
          logout();
          window.location.href = "/";
          // Handle successful logout (e.g., redirect user)
        })
        .catch(function (error) {
          console.error("Error during logout:", error);
        });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },
  render: function () {
    return React.createElement(
      "button",
      { onClick: this.handleLogout },
      "Logout"
    );
  },
});

module.exports = LogoutButton;
