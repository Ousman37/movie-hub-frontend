import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard"; 
import { fetchMovies, fetchPopularMovies } from "../api/tmdb";
import { db } from "../firebase"; 
import { useAuth } from "../context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        setError("Failed to fetch popular movies. Please try again.");
      }
    };

    fetchInitialMovies();
  }, []);

  const handleSearch = async (query) => {
    console.log(`Search query: ${query}`); 
    try {
      const results = await fetchMovies(query);
      console.log("Search results:", results); 
      setMovies(results);
      setError(null); 
    } catch (error) {
      console.error("Error fetching movies:", error); 
      setError("Failed to fetch movies. Please try again.");
      setMovies([]); 
    }
  };

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
    <div className="home-container px-4 lg:px-8 py-8  min-h-screen">
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="content-section flex flex-col lg:flex-row lg:space-x-4 mt-8">
        <div className="carousel-section w-full lg:w-2/3 mb-4 lg:mb-0">
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            {movies.slice(0, 5).map((movie) => (
              <div key={movie.id} className="relative featured-section h-96 lg:h-128">
                <img
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
                  <p className="text-sm text-gray-400 mb-2">{movie.release_date}</p>
                  <p className="text-white mb-2">{movie.overview}</p>
                  <button
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={() => handleMovieSelect(movie.id)}
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="up-next-section w-full lg:w-1/3 flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-4">Up Next</h2>
          <div className="up-next-list bg-gray-800 p-4 rounded shadow-lg flex-grow overflow-y-auto">
            {movies.slice(5, 9).map((movie) => (
              <div
                key={movie.id}
                className="flex items-center mb-4 cursor-pointer"
                onClick={() => handleMovieSelect(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-16 h-24 rounded mr-4"
                />
                <div>
                  <h3 className="text-lg text-white">{movie.title}</h3>
                  <p className="text-sm text-gray-400">{movie.release_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="popular-movies-section mt-8">
        <h2 className="text-3xl font-bold text-white mb-4">Popular Movies</h2>
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
    </div>
  );
}

export default Home;
