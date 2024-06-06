// src/components/NewReleases.jsx
// src/components/NewReleases.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNewReleases } from "../api/tmdb";
import MovieCard from "./MovieCard";
import { db } from "../firebase"; // Import firebase config
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function NewReleases() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const newReleases = await fetchNewReleases();
        setMovies(newReleases);
      } catch (err) {
        console.error("Error fetching new releases:", err); // Debugging statement
        setError("Failed to fetch new releases.");
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
      <h1 className="text-3xl font-bold mb-4">New Releases</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieSelect={handleMovieSelect}
            onAddToFavorites={handleAddToFavorites}
          />
        ))}
      </div>
    </div>
  );
}

export default NewReleases;
