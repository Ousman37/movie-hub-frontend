// src/components/MovieList.js
import React from "react";

function MovieList({ movies, onMovieSelect }) {
  console.log("Rendering MovieList with movies:", movies); // Debugging statement
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
        </div>
      ))}
    </div>
  );
}

export default MovieList;

