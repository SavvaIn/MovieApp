import React from "react";
import PropTypes from "prop-types";
import VoteAverage from "../VoteAverage";
import GiveRating from "../GiveRating";
import { format } from "date-fns";
import noImage from "../../assets/noimage.jpg";
import GenresList from "../GenresList";
import { MoviesContext } from "../../MoviesServicesContext";

import "./MoviesItem.css";

class MoviesItem extends React.Component {
  render() {
    const {
      title,
      releaseData,
      overview,
      poster,
      voteAverage,
      movieId,
      rateData,
      genresId,
      rating,
    } = this.props;

    const posterImage = poster ? `https://image.tmdb.org/t/p/original${poster}` : noImage;
    const formatData = releaseData ? format(new Date(releaseData), "MMMM dd, yyyy") : "";
    const overviewSlice = (overview) => {
      if (overview.length > 110) {
        return overview.slice(0, 110) + "...";
      }
      return overview;
    };
    const titleSlice = (title) => {
      if (title.length > 28) {
        return title.slice(0, 28) + "...";
      }
      return title;
    };
    return (
      <MoviesContext>
        {(context) => {
          const genreNames = genresId
            .map((genreId) => {
              const genre = context.find((genre) => genre.id === genreId);
              return genre ? genre.name : null;
            })
            .filter(Boolean);

          return (
            <li className="movies-item">
              <img src={posterImage} alt="Movie Poster" className="poster-image" />
              <section className="movies-description">
                <div className="movies-description__top">
                  <h5 className="title">{titleSlice(title)}</h5>
                  <VoteAverage voteAverage={voteAverage} />
                </div>
                <span className="release-data">{formatData}</span>
                {genreNames.length > 0 && <GenresList genres={genreNames} />}
                <span className="overview">{overviewSlice(overview)}</span>
                <div className="give-rating">
                  <GiveRating movieId={movieId} rateData={rateData} rating={rating} />
                </div>
              </section>
            </li>
          );
        }}
      </MoviesContext>
    );
  }
}
MoviesItem.propTypes = {
  title: PropTypes.string.isRequired,
  releaseData: PropTypes.string,
  overview: PropTypes.string.isRequired,
  poster: PropTypes.string,
  voteAverage: PropTypes.number.isRequired,
  movieId: PropTypes.number.isRequired,
  rateData: PropTypes.func.isRequired,
  genresId: PropTypes.arrayOf(PropTypes.number).isRequired,
  rating: PropTypes.number.isRequired,
};

MoviesItem.defaultProps = {
  releaseData: "",
  poster: "",
  rating: 0,
};
export default MoviesItem;
