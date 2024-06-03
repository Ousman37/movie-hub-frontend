import React, { useState, useEffect } from "react";
import { fetchGenres } from "../api/tmdb";
import GenreCard from "./GenreCard";

function Genres() {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenreList = async () => {
      try {
        const genreList = await fetchGenres();
        setGenres(genreList);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setError("Failed to fetch genres. Please try again.");
      }
    };

    fetchGenreList();
  }, []);

  return (
    <div className="genres p-4">
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </div>
    </div>
  );
}

export default Genres;
