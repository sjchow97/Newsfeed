var React = require("react");
var Route = require("react-router").Route;
var Router = require("react-router").Router;
var IndexRoute = require("react-router").IndexRoute;
var browserHistory = require("react-router").browserHistory;
var Login = require("./Pages/Login/Login");
// var AuthProvider = require("./Context/AuthContext").AuthProvider;
// var FeedPostLayout = require("../Context/Feed/FeedPostLayout");
var FeedPage = require("./Pages/Feed/FeedPage");
var PrivateRoute = require("./Pages/PrivateRoute");

var App = React.createClass({
  render: function () {
    return (
      <div className="App">
        <Router history={browserHistory}>
          <Route path="/" component={Login} />
          <Route path="/feed" component={FeedPage} />
        </Router>
      </div>
    );
  },
});

module.exports = App;
