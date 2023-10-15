import React from "react";

import "./VoteAverage.css";
import PropTypes from "prop-types";

function VoteAverage({ voteAverage }) {
  const voteAverageFormat = voteAverage ? voteAverage.toFixed(1) : voteAverage;
  const colors = [
    "#E90000",
    "#E90000",
    "#E90000",
    "#E97E00",
    "#E97E00",
    "#E9D100",
    "#E9D100",
    "#66E900",
    "#66E900",
    "#66E900",
    "#66E900",
  ];
  const borderColor = {
    borderColor: colors[Math.floor(voteAverage)],
  };
  return (
    <div className="vote-average" style={borderColor}>
      {voteAverageFormat}
    </div>
  );
}

VoteAverage.defaultProps = {
  voteAverage: 0,
};

VoteAverage.propTypes = {
  voteAverage: PropTypes.number,
};

export default VoteAverage;
