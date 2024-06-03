// src/components/MovieCard.jsx
import React from 'react';

function MovieCard({ movie, onMovieSelect }) {
  const handleClick = () => {
    onMovieSelect(movie.id);
  };

  return (
    <div onClick={handleClick} className="movie-card bg-gray-800 rounded shadow-lg p-4 cursor-pointer">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto rounded mb-4 object-cover"
        />
      ) : (
        <div className="w-full h-auto rounded mb-4 bg-gray-700 flex items-center justify-center text-gray-400">
          No Image Available
        </div>
      )}
      <h2 className="text-lg font-bold text-white mb-2">{movie.title}</h2>
      <p className="text-gray-400">{movie.release_date}</p>
    </div>
  );
}

export default MovieCard;
