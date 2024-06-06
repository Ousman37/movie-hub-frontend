// src/components/FavoriteMovies.jsx
import React from "react";

const FavoriteMovies = ({ favoriteMovies }) => {
  return (
    <div className="text-center mb-4">
      <h2 className="text-xl font-bold mb-4">Favorite Movies</h2>
      <ul className="list-disc list-inside text-left">
        {favoriteMovies.map((movie) => (
          <li key={movie.id} className="mb-2">
            <div className="flex items-center">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="w-12 h-16 mr-4"
              />
              <div>
                <h3 className="font-bold">{movie.title}</h3>
                <p className="text-sm text-gray-600">{movie.release_date}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteMovies;

// // src/components/FavoriteMovies.jsx
// import React from "react";

// const FavoriteMovies = ({ favoriteMovies }) => {
//   return (
//     <div className="text-center mt-4">
//       <h2 className="text-xl font-bold mb-4">Favorite Movies</h2>
//       <ul className="list-disc list-inside text-left">
//         {favoriteMovies.length > 0 ? (
//           favoriteMovies.map((movie, index) => (
//             <li key={index} className="mb-2">
//               {movie}
//             </li>
//           ))
//         ) : (
//           <li>No favorite movies added yet.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default FavoriteMovies;

