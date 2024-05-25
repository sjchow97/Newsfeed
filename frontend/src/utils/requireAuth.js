var React = require("react");
var browserHistory = require("react-router").browserHistory;

function requireAuth(Component) {
  return React.createClass({
    componentWillMount: function () {
      this.checkAuth();
    },

    componentWillReceiveProps: function () {
      this.checkAuth();
    },

    checkAuth: function () {
      if (!localStorage.getItem("token")) {
        browserHistory.push("/");
      }
    },

    render: function () {
      return localStorage.getItem("token") ? (
        <Component {...this.props} />
      ) : null;
    },
  });
}

module.exports = requireAuth;
