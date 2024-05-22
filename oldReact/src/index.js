var React = require("react");
var ReactDOM = require("react-dom");
var Router = require("react-router").Router;
var Route = require("react-router").Route;
var createHistory = require("history").createHistory;
var App = require("./App");
var Login = require("./Pages/Login/Login");
var FeedPage = require("./Pages/Feed/FeedPage");
require("./index.css");

// Create a browser history object
var history = createHistory();

// Define your routes
var routes = (
  <Router history={history}>
    <Route path="/" component={Login} />
    <Route path="feed" component={FeedPage} />
  </Router>
);

// Render your routes to the DOM
ReactDOM.render(routes, document.getElementById("root"));
