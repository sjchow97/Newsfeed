var React = require("react");
var Link = require("react-router").Link;
var browserHistory = require("react-router").browserHistory;
var getCSRFToken = require("../../services/utils").getCSRFToken;
var axios = require("axios");
require("./Login.css");

var Login = React.createClass({
  getInitialState: function () {
    return {
      username: "",
      password: "",
      message: "",
    };
  },

  handleUsernameChange: function (event) {
    this.setState({ username: event.target.value });
  },

  handlePasswordChange: function (event) {
    this.setState({ password: event.target.value });
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var self = this;

    axios
      .post(
        "http://127.0.0.1:8000/auth/login/",
        {
          username: this.state.username,
          password: this.state.password,
        },
        { withCredentials: true }
      )
      .then(function (response) {
        self.setState({ message: response.data.message });
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        browserHistory.push("/feed");
      })
      .catch(function (error) {
        if (error.response) {
          self.setState({ message: error.response.data.error });
        } else {
          // The request was made but no response was received or a network error occurred
          // You can capture the error message in the state, or handle it in another way
          self.setState({ message: error.message });
        }
      });
  },

  render: function () {
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              required
            />
          </div>
          <button className="button" type="submit">
            Login
          </button>
          {this.state.message && <p>{this.state.message}</p>}
          <Link to="/feed">Go to feed</Link>
        </form>
      </div>
    );
  },
});

module.exports = Login;
