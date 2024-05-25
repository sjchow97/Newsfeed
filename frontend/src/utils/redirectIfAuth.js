var React = require("react");
var { browserHistory } = require("react-router");

function redirectIfAuth(Component) {
  return React.createClass({
    componentDidMount: function () {
      const token = localStorage.getItem("token");
      if (token) {
        browserHistory.push("/feed");
      }
    },
    render: function () {
      const token = localStorage.getItem("token");
      return token ? null : <Component {...this.props} />;
    },
  });
}

module.exports = redirectIfAuth;
