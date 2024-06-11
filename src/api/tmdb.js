
import axios from "axios";

const API_KEY =
  process.env.REACT_APP_TMDB_API_KEY || "d76d067f8e9e603924ff879c0232fe38";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (query) => {
  console.log(`Fetching movies for query: ${query}`); // Debugging statement
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });

    console.log("Full API response:", response); // Debugging statement

    if (response.status !== 200) {
      throw new Error("Failed to fetch movies");
    }

    console.log("Fetched movies:", response.data.results); // Debugging statement
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error); // Debugging statement
    return [];
  }
};

export const fetchPopularMovies = async () => {
  console.log("Fetching popular movies"); // Debugging statement
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
      },
    });

    console.log("Full API response:", response); // Debugging statement

    if (response.status !== 200) {
      throw new Error("Failed to fetch popular movies");
    }

    console.log("Fetched popular movies:", response.data.results); // Debugging statement
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error); // Debugging statement
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  console.log(`Fetching details for movie ID: ${movieId}`); // Debugging statement
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos,images",
      },
    });

    console.log("Full movie details API response:", response); // Debugging statement

    if (response.status !== 200) {
      throw new Error("Failed to fetch movie details");
    }

    console.log("Fetched movie details:", response.data); // Debugging statement
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching movie details:",
      error.response ? error.response.data : error.message
    ); // Detailed error logging
    return null;
  }
};

export const fetchGenres = async () => {
  console.log("Fetching genres"); // Debugging statement
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });

    console.log("Full API response:", response); // Debugging statement

    if (response.status !== 200) {
      throw new Error("Failed to fetch genres");
    }

    console.log("Fetched genres:", response.data.genres); // Debugging statement
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error); // Debugging statement
    return [];
  }
};

export const fetchMoviesByGenre = async (genreId) => {
  console.log(`Fetching movies for genre ID: ${genreId}`); // Debugging statement
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
      },
    });

    console.log("Full API response:", response); // Debugging statement

    if (response.status !== 200) {
      throw new Error("Failed to fetch movies");
    }

    console.log("Fetched movies by genre:", response.data.results); // Debugging statement
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error); // Debugging statement
    return [];
  }
};

export const fetchNewReleases = async () => {
  console.log("Fetching new releases"); // Debugging statement
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
      },
    });

    console.log("Full API response:", response); // Debugging statement

    if (response.status !== 200) {
      throw new Error("Failed to fetch new releases");
    }

    console.log("Fetched new releases:", response.data.results); // Debugging statement
    return response.data.results;
  } catch (error) {
    console.error("Error fetching new releases:", error); // Debugging statement
    return [];
  }
};
