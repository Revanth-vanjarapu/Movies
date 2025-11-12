import React from 'react';
import './index.css';

class Pagination extends React.Component {
  state = {
    pageNo: 1,
  };

  onNextPage = () => {
    const { apiCallback, totalPages } = this.props;
    this.setState(
      (prevState) => {
        if (prevState.pageNo < totalPages) {
          return {
            pageNo: prevState.pageNo + 1,
          };
        }
        return prevState;
      },
      () => {
        const { pageNo } = this.state;
        apiCallback(pageNo);
      },
    );
  };

  onPrevPage = () => {
    const { apiCallback } = this.props;
    this.setState(
      (prevState) => {
        if (prevState.pageNo > 1) {
          return {
            pageNo: prevState.pageNo - 1,
          };
        }
        return prevState;
      },
      () => {
        const { pageNo } = this.state;
        apiCallback(pageNo);
      },
    );
  };

  render() {
    const { pageNo } = this.state;
    const { totalPages } = this.props;

    return (
      <div className="pagenation">
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.onPrevPage}
          disabled={pageNo === 1}
        >
          Prev
        </button>
        <p className="page-no">{pageNo} </p>
        <p className="page-no">/ {totalPages} </p>
        <button
          type="button"
          name="Next"
          title="Next"
          className="btn btn-primary"
          onClick={this.onNextPage}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Pagination;
