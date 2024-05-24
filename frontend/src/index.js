var React = require("react");
var ReactDOM = require("react-dom");
var Router = require("react-router").Router;
var Route = require("react-router").Route;
var browserHistory = require("react-router").browserHistory;
var App = require("./App");
var Login = require("./Pages/Login/Login");
var FeedPage = require("./Pages/Feed/FeedPage");
var PostPage = require("./Pages/Post/PostPage");
require("./index.css");

// Define your routes
var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/feed" component={FeedPage} />
    <Route path="/feed/:uuid" component={PostPage} />
  </Router>
);

// Render your routes to the DOM
ReactDOM.render(routes, document.getElementById("root"));
