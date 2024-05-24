var React = require("react");
var browserHistory = require("react-router").browserHistory;
require("./Pagination.css");

var Pagination = React.createClass({
  handlePageChange: function (pageNumber, event) {
    event.preventDefault();
    this.props.onPageChange(pageNumber);
    browserHistory.push(`/feed?page=${pageNumber}`);
  },

  render: function () {
    return (
      <div className="pagination">
        <ul>
          <li>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                if (this.props.currentPage > 1) {
                  this.handlePageChange(this.props.currentPage - 1, event);
                }
              }}
              className={this.props.currentPage === 1 ? "disabled" : ""}
            >
              &laquo; Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                if (this.props.currentPage < this.props.totalPages) {
                  this.handlePageChange(this.props.currentPage + 1, event);
                }
              }}
              className={
                this.props.currentPage === this.props.totalPages
                  ? "disabled"
                  : ""
              }
            >
              Next &raquo;
            </a>
          </li>
        </ul>
      </div>
    );
  },
});

module.exports = Pagination;
