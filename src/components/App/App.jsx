import React from "react";
import { Alert } from "antd";
import ApiMovies from "../../services/ApiMovies";
import ApiRatingMovies from "../../services/ApiRatingMovies";
import InputSearch from "../InputSearch";
import Footer from "../Footer";
import HeaderBar from "../HeaderBar";

import MoviesList from "../MoviesList";
import { MoviesProvider } from "../../MoviesServicesContext";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesData: [],
      loading: true,
      online: navigator.onLine,
      searchValue: "",
      page: 1,
      totalPages: 1,
      sessionId: "",
      value: 0,
      movieId: "",
      ratedMovies: [],
      activeTab: "1",
      genres: [],
      error: null,
      totalPagesRate: 1,
      pageRate: 1,
    };
  }

  setError = (errorMessage) => {
    this.setState({ error: errorMessage });
  };

  searchChange = (value) => {
    this.setState({ searchValue: value, page: 1 }, () => {
      this.fetchMovies();
    });
  };

  handlePageChange = (pageNumber) => {
    const { activeTab, sessionId } = this.state;

    if (activeTab === "1") {
      this.setState({ page: pageNumber }, () => {
        this.fetchMovies();
      });
    } else if (activeTab === "2") {
      this.getRatedMovies(sessionId, pageNumber);
    }
  };

  saveSessionIdToLocalStorage = (sessionId) => {
    localStorage.setItem("sessionId", sessionId);
  };

  getSessionIdFromLocalStorage = () => localStorage.getItem("sessionId");

  async componentDidMount() {
    const { value, movieId, pageRate } = this.state;

    this.apiMovies = new ApiMovies();
    this.apiRatingMovies = new ApiRatingMovies();
    window.addEventListener("online", this.handleOnlineStatus);
    window.addEventListener("offline", this.handleOnlineStatus);

    try {
      const storedSessionId = this.getSessionIdFromLocalStorage();

      if (storedSessionId) {
        this.setState({ sessionId: storedSessionId });
      } else {
        const sessionData = await this.apiRatingMovies.guestSession();
        const sessionId = sessionData.guest_session_id;

        this.saveSessionIdToLocalStorage(sessionId);
        this.apiRatingMovies.addRateMovies(movieId, sessionId, value).catch((error) => {
          this.setError(`Произошла ошибка: ${error.message}`);
        });
        this.getRatedMovies(sessionId, pageRate);
      }
    } catch (error) {
      this.setError(`Произошла ошибка: ${error.message}`);
    }

    this.fetchMovies();
    this.apiMovies.fetchGenres().then((genres) => {
      this.setState({ genres });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleOnlineStatus, {
      passive: true,
    });
    window.removeEventListener("offline", this.handleOnlineStatus, {
      passive: true,
    });
  }

  handleOnlineStatus = () => {
    this.setState({ online: navigator.onLine });
  };

  fetchMovies() {
    const { searchValue, page } = this.state;

    this.apiMovies
      .getAllMovies(searchValue, page)
      .then((data) => {
        if (data.results && data.total_results) {
          this.setState({
            moviesData: data.results,
            totalPages: data.total_pages,
            loading: false,
          });
        } else {
          this.setError("Фильмы не найдены");
          this.setState({
            moviesData: [],
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setError(`Произошла ошибка: ${error.message}`);
        this.setState({
          moviesData: [],
          loading: false,
        });
      });
  }

  rateData = (value, movieId) => {
    this.setState({ value, movieId }, () => {
      this.addRateMovie();
    });
  };

  async addRateMovie() {
    const { movieId, sessionId, value } = this.state;
    try {
      await this.apiRatingMovies.addRateMovies(movieId, sessionId, value);
    } catch (error) {
      this.setError(`Произошла ошибка: ${error.message}`);
    }
  }

  async getRatedMovies(sessionId, pageRate) {
    try {
      const responseData = await this.apiRatingMovies.getRatedMovies(sessionId, pageRate);
      this.setState({
        ratedMovies: responseData.results,
        totalPagesRate: responseData.total_pages,
        pageRate,
      });
    } catch (error) {
      this.setError(`Произошла ошибка: ${error.message}`);
    }
  }

  handleTabChange = (activeTab) => {
    const { sessionId } = this.state;

    this.setState({ activeTab }, () => {
      if (activeTab === "1") {
        this.fetchMovies();
      } else if (activeTab === "2") {
        this.getRatedMovies(sessionId, this.state.pageRate);
      }
    });
  };

  render() {
    const {
      moviesData,
      loading,
      online,
      page,
      totalPages,
      ratedMovies,
      activeTab,
      genres,
      totalPagesRate,
      pageRate,
    } = this.state;

    if (!online) {
      return <div className="offline">no internet, please check your connection...</div>;
    }
    return (
      <MoviesProvider value={genres}>
        <section className="app">
          {this.state.error && <Alert message={this.state.error} type="error" closable />}
          <HeaderBar onChange={this.handleTabChange} />
          {activeTab === "1" && <InputSearch searchChange={this.searchChange} />}
          {activeTab === "1" ? (
            <MoviesList moviesData={moviesData} loading={loading} rateData={this.rateData} />
          ) : (
            <MoviesList moviesData={ratedMovies} loading={loading} rateData={this.rateData} />
          )}
          <Footer
            page={activeTab === "1" ? page : pageRate}
            onPageChange={this.handlePageChange}
            totalPages={activeTab === "1" ? totalPages : totalPagesRate * 10}
          />
        </section>
      </MoviesProvider>
    );
  }
}

export default App;
