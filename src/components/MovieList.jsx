// src/components/MovieList.js
import React from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase"; 
import { doc, setDoc } from "firebase/firestore";

function MovieList({ movies, onMovieSelect }) {
  console.log("Rendering MovieList with movies:", movies); 
  const auth = getAuth();
  const user = auth.currentUser;

  const handleAddToFavorites = async (movie) => {
    if (user) {
      try {
        const movieDoc = doc(
          db,
          "users",
          user.uid,
          "favorites",
          movie.id.toString()
        );
        await setDoc(movieDoc, {
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          id: movie.id,
        });
        alert(`${movie.title} added to favorites!`);
      } catch (err) {
        console.error("Error adding movie to favorites: ", err);
        alert("Failed to add movie to favorites.");
      }
    } else {
      alert("You need to log in to add movies to your favorites.");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {movies.length === 0 && <p>No movies found.</p>}
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-gray-800 rounded p-4 shadow-lg cursor-pointer"
          onClick={() => onMovieSelect(movie.id)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto mb-4 rounded"
          />
          <h2 className="text-lg font-bold">{movie.title}</h2>
          <p className="text-sm text-gray-400">{movie.release_date}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToFavorites(movie);
            }}
            className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            ❤️ Add to Favorites
          </button>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
