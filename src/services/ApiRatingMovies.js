import axios from "axios";
import { BASE_URL, TOKEN } from "./ApiMovies";
const apiKey = "207d9edb43960c1e8fb5c2a7465fdbf6";

export default class ApiRatingMovies {
  constructor() {
    this.baseURL = BASE_URL;
    this.baseTOKEN = TOKEN;
  }

  async guestSession() {
    try {
      const response = await axios({
        method: "GET",
        url: `${this.baseURL}/authentication/guest_session/new`,
        headers: {
          accept: "application/json",
          Authorization: this.baseTOKEN,
        },
      });

      if (!response.ok) {
        return response.data;
      } else {
        throw new Error(`Failed to get guest session. Status: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async addRateMovies(movieId, sessionId, value) {
    const url = `${this.baseURL}/movie/${movieId}/rating?api_key=${apiKey}`;

    const data = {
      value,
    };

    const headers = {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    };

    const params = {
      guest_session_id: sessionId,
    };

    try {
      const response = await axios.post(url, data, { headers, params });
      if (!response.ok) {
        return response.data;
      } else {
        throw new Error(`Failed to add movie rating. Status: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async getRatedMovies(sessionId, pageRate) {
    if (typeof pageRate === "undefined") {
      pageRate = 1;
    }
    const url = `${this.baseURL}/guest_session/${sessionId}/rated/movies?api_key=${apiKey}`;

    const params = {
      language: "en-US",
      page: pageRate.toString(),
      sort_by: "created_at.asc",
    };
    const headers = {
      accept: "application/json",
    };

    try {
      const response = await axios.get(url, { params, headers });
      if (!response.ok) {
        return response.data;
      } else {
        throw new Error(`Failed to get rated movies. Status: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }
}
