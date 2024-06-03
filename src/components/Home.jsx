// src/components/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import { fetchMovies, fetchPopularMovies } from "../api/tmdb";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        setError("Failed to fetch popular movies. Please try again.");
      }
    };

    fetchInitialMovies();
  }, []);

  const handleSearch = async (query) => {
    console.log(`Search query: ${query}`); // Debugging statement
    try {
      const results = await fetchMovies(query);
      console.log("Search results:", results); // Debugging statement
      setMovies(results);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching movies:", error); // Debugging statement
      setError("Failed to fetch movies. Please try again.");
      setMovies([]); // Clear previous results on error
    }
  };

  const handleMovieSelect = (movieId) => {
    console.log(`Selected movie ID: ${movieId}`); // Debugging statement
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="home-container">
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="content-section flex flex-col lg:flex-row lg:space-x-4">
        <div className="carousel-section w-full lg:w-2/3 mb-4 lg:mb-0">
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            {movies.slice(0, 5).map((movie) => (
              <div key={movie.id} className="relative featured-section h-full">
                <img
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded"
                />
                <div className="legend">
                  <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                  <p className="text-sm text-gray-400 mb-2">
                    {movie.release_date}
                  </p>
                  <p className="mb-2">{movie.overview}</p>
                  <button
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={() => handleMovieSelect(movie.id)}
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="up-next-section w-full lg:w-1/3 flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-4">Up Next</h2>
          <div className="up-next-list bg-gray-800 p-4 rounded shadow-lg flex-grow">
            {movies.slice(5, 9).map((movie) => (
              <div
                key={movie.id}
                className="flex items-center mb-4 cursor-pointer"
                onClick={() => handleMovieSelect(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-16 h-24 rounded mr-4"
                />
                <div>
                  <h3 className="text-lg text-white">{movie.title}</h3>
                  <p className="text-sm text-gray-400">{movie.release_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="popular-movies-section mt-8">
        <h2 className="text-3xl font-bold mb-4">Popular Movies</h2>
        <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
      </div>
    </div>
  );
}

export default Home;
