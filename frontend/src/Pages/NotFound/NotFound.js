var React = require("react");
var Navbar = require("../../Components/Layout/Navbar");
var Sidebar = require("../../Components/Layout/Sidebar");
var Link = require("react-router").Link;
require("./NotFound.css");

var NotFound = React.createClass({
  render: function () {
    return (
      <div className="notFound">
        <Navbar />
        <div className="content">
          <Sidebar />
          <div className="notFound-message">
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/feed">Return to the feed page</Link>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = NotFound;
