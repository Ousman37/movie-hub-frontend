import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { fetchMovies } from "../api/tmdb";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const results = await fetchMovies(searchTerm);
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300); // Debounce fetch for 300ms
    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion.title);
    setSearchTerm(suggestion.title);
    setSuggestions([]);
  };

  return (
    <div className="relative p-4">
      <form onSubmit={handleSubmit} className="flex items-center">
        <FiSearch className="absolute ml-3 text-gray-400" />
        <input
          type="text"
          className="w-full p-2 pl-10 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for a movie or series"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-800 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Search
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white text-black border border-gray-300 rounded shadow-lg z-10">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
