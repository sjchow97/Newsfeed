var React = require("react");
var useAuth = require("../../Context/AuthContext").useAuth;
var api = require("../../utils/api");
require("./LogoutButton.css");

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
    return (
      <button className="logoutButton" onClick={this.handleLogout}>
        Logout
      </button>
    );
  },
});

module.exports = LogoutButton;
