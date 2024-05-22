var React = require("react");

var AuthContext = React.createClass({
  getInitialState: function () {
    var storedUser = localStorage.getItem("user");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
    };
  },

  login: function (userData) {
    this.setState({ user: userData });
    localStorage.setItem("user", JSON.stringify(userData));
  },

  logout: function () {
    this.setState({ user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  childContextTypes: {
    user: React.PropTypes.object,
    login: React.PropTypes.func,
    logout: React.PropTypes.func,
  },

  getChildContext: function () {
    return {
      user: this.state.user,
      login: this.login,
      logout: this.logout,
    };
  },

  render: function () {
    return React.Children.only(this.props.children);
  },
});

// Custom hook to use the auth context
var useAuth = function () {
  return React.useContext(AuthContext);
};

module.exports = {
  AuthProvider: AuthContext,
  useAuth: useAuth,
};
