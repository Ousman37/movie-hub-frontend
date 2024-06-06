 // src/components/MovieDetails.jsx
 import React, { useState, useEffect } from "react";
 import { useParams } from "react-router-dom";
 import { fetchMovieDetails } from "../api/tmdb";
 import { getAuth } from "firebase/auth";
 import { db } from "../firebase"; 
 import { doc, setDoc } from "firebase/firestore";

 function MovieDetails() {
   const { movieId } = useParams();
   const [movie, setMovie] = useState(null);
   const [error, setError] = useState(null);
   const auth = getAuth();
   const user = auth.currentUser;

   useEffect(() => {
     if (!movieId) {
       setError("Movie ID is undefined.");
       return;
     }

     const fetchDetails = async () => {
       try {
         const movieData = await fetchMovieDetails(movieId);
         if (!movieData) {
           setError("Failed to fetch movie details.");
         } else {
           setMovie(movieData);
         }
       } catch (err) {
         console.error("Error fetching movie details:", err);
         setError("Failed to fetch movie details.");
       }
     };

     fetchDetails();
   }, [movieId]);

   const handleAddToFavorites = async () => {
     if (user) {
       try {
         const movieDoc = doc(db, "users", user.uid, "favorites", movieId);
         await setDoc(movieDoc, {
           title: movie.title,
           poster_path: movie.poster_path,
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

   if (error) return <p>{error}</p>;
   if (!movie) return <p>Loading...</p>;

   return (
     <div className="movie-details p-4 bg-gray-800 rounded shadow-lg text-white">
       <div className="flex flex-col md:flex-row">
         {movie.poster_path ? (
           <img
             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
             alt={movie.title}
             className="w-full md:w-1/3 rounded mb-4 object-cover"
             style={{ objectFit: "cover", maxHeight: "500px" }}
           />
         ) : (
           <div className="w-full md:w-1/3 rounded mb-4 bg-gray-700 flex items-center justify-center text-gray-400">
             No Image Available
           </div>
         )}
         <div className="md:ml-4 flex-1">
           <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
           <p className="text-sm text-gray-400 mb-4">{movie.release_date}</p>
           <p className="mb-4">{movie.overview}</p>
           {movie.genres && movie.genres.length > 0 && (
             <div className="mb-4">
               <h3 className="text-lg font-semibold">Genres:</h3>
               <ul className="list-disc list-inside">
                 {movie.genres.map((genre) => (
                   <li key={genre.id}>{genre.name}</li>
                 ))}
               </ul>
             </div>
           )}
           {movie.runtime && (
             <p className="mb-4">
               <span className="font-semibold">Runtime:</span> {movie.runtime}{" "}
               minutes
             </p>
           )}
           {movie.videos && movie.videos.results.length > 0 && (
             <div className="mb-4">
               <h3 className="text-lg font-semibold">Videos:</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {movie.videos.results.map((video) => (
                   <div key={video.id} className="video-item">
                     <iframe
                       width="100%"
                       height="315"
                       src={`https://www.youtube.com/embed/${video.key}`}
                       title={video.name}
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                       allowFullScreen
                     ></iframe>
                     <p className="mt-2">{video.name}</p>
                   </div>
                 ))}
               </div>
             </div>
           )}
           {movie.backdrop_path && (
             <div className="backdrop-image mb-4">
               <img
                 src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                 alt={movie.title}
                 className="w-full rounded max-h-64 object-cover"
                 style={{ objectFit: "cover" }}
               />
             </div>
           )}
           <button
             onClick={handleAddToFavorites}
             className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
           >
             ❤️ Add to Favorites
           </button>
         </div>
       </div>
     </div>
   );
 }

 export default MovieDetails;
