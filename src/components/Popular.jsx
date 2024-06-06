import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPopularMovies } from "../api/tmdb";
import MovieCard from "./MovieCard";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Popular() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

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

  const handleAddToFavorites = async (movie) => {
    if (!currentUser) {
      alert("You need to log in to add favorites.");
      return;
    }

    try {
      const favoritesCollection = collection(
        db,
        "users",
        currentUser.uid,
        "favorites"
      );
      await addDoc(favoritesCollection, {
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
      });
      alert(`${movie.title} has been added to your favorites!`);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add to favorites. Please try again.");
    }
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
            onAddToFavorites={handleAddToFavorites} // Pass the function here
          />
        ))}
      </div>
    </div>
  );
}

export default Popular;
