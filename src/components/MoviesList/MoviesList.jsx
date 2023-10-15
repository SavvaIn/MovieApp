import React from "react";
import PropTypes from "prop-types";
import { Space, Spin, Alert } from "antd";
import MoviesItem from "../MoviesItem";

import "./MoviesList.css";
class MoviesList extends React.Component {
  render() {
    const { moviesData, loading, rateData } = this.props;

    if (loading) {
      return (
        <Space direction="vertical" style={{ width: "100%" }} className="loading-spin">
          <Spin tip="Loading" size="large" className="spin">
            <div className="content" />
          </Spin>
        </Space>
      );
    }
    if (moviesData.length === 0) {
      return (
        <>
          <Alert message="Not found! Try again.." type="error" />
        </>
      );
    }
    return (
      <ul className="movies-list">
        {moviesData.map((item) => (
          <MoviesItem
            key={item.id}
            title={item.title}
            releaseData={item.release_date}
            overview={item.overview}
            poster={item.poster_path}
            voteAverage={item.vote_average}
            movieId={item.id}
            rateData={rateData}
            genresId={item.genre_ids}
            rating={item.rating}
          />
        ))}
      </ul>
    );
  }
}

MoviesList.defaultProps = {
  moviesData: [],
  loading: false,
  rateData: null,
};

MoviesList.propTypes = {
  moviesData: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  rateData: PropTypes.func,
};

export default MoviesList;
