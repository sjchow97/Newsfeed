var React = require("react");
var ReactDOM = require("react-dom");
var Router = require("react-router").Router;
var Route = require("react-router").Route;
var browserHistory = require("react-router").browserHistory;
var requireAuth = require("./utils/requireAuth");
var App = require("./App");
var Login = require("./Pages/Login/Login");
var FeedPage = require("./Pages/Feed/FeedPage");
var PostPage = require("./Pages/Post/PostPage");
var NotFound = require("./Pages/NotFound/NotFound");
require("./index.css");

// Define your routes
var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/feed" component={requireAuth(FeedPage)} />
    <Route path="/feed/:uuid" component={requireAuth(PostPage)} />
    <Route path="*" component={NotFound} />
  </Router>
);

// Render your routes to the DOM
ReactDOM.render(routes, document.getElementById("root"));
