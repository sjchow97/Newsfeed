var React = require("react");
var Navigate = require("react-router").Navigate;
var AuthContext = require("../Context/AuthContext");

var PrivateRoute = React.createClass({
  render: function () {
    var user = AuthContext.useAuth().user;

    return user ? this.props.children : <Navigate to="/" />;
  },
});

module.exports = PrivateRoute;
