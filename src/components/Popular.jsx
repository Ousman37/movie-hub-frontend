import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPopularMovies } from "../api/tmdb";
import MovieCard from "./MovieCard";

function Popular() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error("Error fetching popular movies:", err); // Debugging statement
        setError("Failed to fetch popular movies.");
      }
    };

    fetchMovies();
  }, []);

  const handleMovieSelect = (movieId) => {
    console.log(`Selected movie ID: ${movieId}`); // Debugging statement
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieSelect={handleMovieSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default Popular;
