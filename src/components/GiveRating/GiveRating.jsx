import React from "react";
import PropTypes from "prop-types";
import { Rate } from "antd";

function GiveRating({ movieId, rateData, rating }) {
  const rateStyle = { fontSize: 16 };
  const rateClick = (value) => {
    if (typeof rateData === "function") {
      rateData(value, movieId);
    }
  };

  return (
    <Rate
      style={rateStyle}
      count={10}
      allowClear={false}
      allowHalf
      onChange={rateClick}
      defaultValue={rating}
    />
  );
}
GiveRating.propTypes = {
  movieId: PropTypes.number.isRequired,
  rateData: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
};
GiveRating.defaultProps = {
  movieId: 0,
  rateData: () => {},
  rating: 0,
};
export default GiveRating;
