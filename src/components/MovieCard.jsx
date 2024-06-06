// src/components/MovieCard.jsx
// src/components/MovieCard.jsx
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

function MovieCard({ movie, onMovieSelect, onAddToFavorites }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFavoriteClick = async () => {
    setLoading(true);
    await onAddToFavorites(movie);
    setIsFavorite(!isFavorite);
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 rounded p-4 shadow-lg cursor-pointer relative">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto mb-4 rounded"
        onClick={() => onMovieSelect(movie.id)}
      />
      <div className="flex justify-between items-center">
        <div onClick={() => onMovieSelect(movie.id)}>
          <h2 className="text-lg font-bold">{movie.title}</h2>
          <p className="text-sm text-gray-400">{movie.release_date}</p>
        </div>
        <button
          onClick={handleFavoriteClick}
          className={`text-white hover:text-red-700 ${isFavorite ? "text-red-500" : "text-gray-500"}`}
          disabled={loading}
        >
          {loading ? (
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/20807/loading-small-green.gif" alt="Loading" />
          ) : (
            <>
              <FaHeart size={20} />
              <span className="ml-2">{isFavorite ? 2 : 1}</span>
            </>
          )}
        </button>
      </div>
      {isFavorite && <span className="absolute top-0 right-0 mt-2 mr-2 text-xs bg-red-500 text-white px-2 py-1 rounded">Favorite</span>}
    </div>
  );
}

export default MovieCard;
