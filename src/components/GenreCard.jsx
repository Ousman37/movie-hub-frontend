// src/components/Genres/GenreCard.jsx
import React from "react";
import { Link } from "react-router-dom";

function GenreCard({ genre }) {
  return (
    <Link
      to={`/genre/${genre.id}`}
      className="genre-card bg-gray-800 rounded shadow-lg p-4 hover:bg-gray-700 transition duration-200"
    >
      <h2 className="text-lg font-bold text-white">{genre.name}</h2>
    </Link>
  );
}

export default GenreCard;
