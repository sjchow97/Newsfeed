var React = require("react");
var browserHistory = require("react-router").browserHistory;
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

    fetch("http://127.0.0.1:8000/auth/login/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error logging in');
      }
      return response.json();
    })
    .then(data => {
      this.setState({ message: data.message });
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      browserHistory.push("/feed");
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
      <div className="login-container">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="username"
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
        </form>
      </div>
    );
  },
});

module.exports = Login;
