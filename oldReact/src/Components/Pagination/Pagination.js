var React = require("react");
var browserHistory = require("react-router").browserHistory;
require("./Pagination.css");

var Pagination = React.createClass({
  handlePageChange: function (pageNumber, event) {
    event.preventDefault();
    this.props.onPageChange(pageNumber);
    browserHistory.push(`?page=${pageNumber}`);
  },

  renderPageNumbers: function () {
    var totalPages = this.props.totalPages;
    var currentPage = this.props.currentPage;
    var pageNumbers = [];
    var maxDisplayedPages = 5;

    if (totalPages <= maxDisplayedPages) {
      // Show all page numbers if total pages is less than or equal to maxDisplayedPages
      for (var i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li key={i} className={currentPage === i ? "active" : ""}>
            <a href="#" onClick={this.handlePageChange.bind(this, i)}>
              {i}
            </a>
          </li>
        );
      }
    } else {
      // Show first, last, and a few pages around the current page with ellipses
      if (currentPage > 1) {
        pageNumbers.push(
          <li key={1}>
            <a href="#" onClick={this.handlePageChange.bind(this, 1)}>
              1
            </a>
          </li>
        );
      }
      if (currentPage > 3) {
        pageNumbers.push(
          <li key="ellipsis1" className="ellipsis">
            ...
          </li>
        );
      }
      for (
        var i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pageNumbers.push(
          <li key={i} className={currentPage === i ? "active" : ""}>
            <a href="#" onClick={this.handlePageChange.bind(this, i)}>
              {i}
            </a>
          </li>
        );
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <li key="ellipsis2" className="ellipsis">
            ...
          </li>
        );
      }
      if (currentPage < totalPages) {
        pageNumbers.push(
          <li key={totalPages}>
            <a href="#" onClick={this.handlePageChange.bind(this, totalPages)}>
              {totalPages}
            </a>
          </li>
        );
      }
    }

    return pageNumbers;
  },

  handlePreviousPage: function (event) {
    event.preventDefault();
    if (this.props.currentPage > 1) {
      this.handlePageChange(this.props.currentPage - 1);
    }
  },

  handleNextPage: function (event) {
    event.preventDefault();
    if (this.props.currentPage < this.props.totalPages) {
      this.handlePageChange(this.props.currentPage + 1);
    }
  },

  render: function () {
    return (
      <div className="pagination">
        <ul>
          <li>
            <a href="#" onClick={this.handlePreviousPage}>
              &laquo; Previous
            </a>
          </li>
          {this.renderPageNumbers()}
          <li>
            <a href="#" onClick={this.handleNextPage}>
              Next &raquo;
            </a>
          </li>
        </ul>
      </div>
    );
  },
});

module.exports = Pagination;
