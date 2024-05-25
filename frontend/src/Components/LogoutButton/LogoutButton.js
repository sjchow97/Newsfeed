var React = require("react");
var axios = require('axios');
var browserHistory = require('react-router').browserHistory;
require("./LogoutButton.css");

var LogoutButton = React.createClass({
  handleLogout: function () {
    var token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/auth/logout/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ user: null });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      console.log(data.message);
      browserHistory.push('/');
    })
    .catch(error => {
      if (error.response) {
        this.setState({ message: error.response.data.error });
      } else {
        this.setState({ message: error.message });
      }
    });
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