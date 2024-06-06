import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMoviesByGenre } from "../api/tmdb";
import MovieList from "./MovieList";

function MoviesByGenre() {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const genreMovies = await fetchMoviesByGenre(genreId);
        setMovies(genreMovies);
      } catch (error) {
        console.error("Error fetching movies by genre:", error);
        setError("Failed to fetch movies by genre. Please try again.");
      }
    };

    fetchMovies();
  }, [genreId]);

  const handleMovieSelect = (movieId) => {
    console.log(`Selected movie ID: ${movieId}`); // Debugging statement
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="movies-by-genre p-4">
      {error && <p className="text-red-500">{error}</p>}
      <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
    </div>
  );
}

export default MoviesByGenre;
