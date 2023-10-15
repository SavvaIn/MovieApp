import React from "react";
import PropTypes from "prop-types";
import "./GenresList.css";

class GenresList extends React.Component {
  render() {
    const { genres } = this.props;

    return (
      <ul className="genres-list">
        {genres.map((genre, index) => {
          const firstPart = genre.split(" ")[0];
          return (
            <li className="genres" key={index}>
              {firstPart}
            </li>
          );
        })}
      </ul>
    );
  }
}

GenresList.defaultProps = {
  genres: [],
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string),
};

export default GenresList;
