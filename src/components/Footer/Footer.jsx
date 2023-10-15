import React from "react";
import PropTypes from "prop-types";
import "./Footer.css";
import { Pagination } from "antd";

function Footer(props) {
  const { page, onPageChange, totalPages } = props;

  const handlePageChange = (pageNumber) => {
    if (onPageChange) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="footer">
      <Pagination
        current={page}
        total={totalPages}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
}

Footer.defaultProps = {
  page: 1,
  totalPages: 1,
  onPageChange: () => {},
};

Footer.propTypes = {
  page: PropTypes.number,
  onPageChange: PropTypes.func,
  totalPages: PropTypes.number,
};

export default Footer;
