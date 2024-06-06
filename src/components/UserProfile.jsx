// src/components/Profile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase"; // Import your firebase config
import { collection, getDocs } from "firebase/firestore";
import ProfilePictureUpload from "./ProfilePictureUpload";
import EditProfile from "./EditProfile";
import ActivityLog from "./ActivityLog";
import FavoriteMovies from "./FavoriteMovies";


const UserProfile = () => {
  const { currentUser } = useAuth();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const moviesCollection = collection(
          db,
          "users",
          currentUser.uid,
          "favorites"
        );
        const moviesSnapshot = await getDocs(moviesCollection);
        const moviesList = moviesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavoriteMovies(moviesList);
      } catch (error) {
        console.error("Error fetching favorite movies: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchFavoriteMovies();
    }
  }, [currentUser]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-customDarkBlue via-customLightBlue to-customTeal py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex flex-col items-center">
          <ProfilePictureUpload />
          <h1 className="text-4xl font-bold mt-6 mb-2 text-center text-black">
            Profile
          </h1>
          <p className="text-lg text-black text-center mb-6">
            Welcome, <span className="font-semibold">{currentUser.email}</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditProfile />
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black text-center md:text-left">
              Activity Log
            </h2>
            <ActivityLog
              activities={[
                "Rated 'Inception' 5 stars",
                "Added 'The Dark Knight' to favorites",
                "Reviewed 'Interstellar'",
              ]}
            />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-black text-center">
              Favorite Movies
            </h2>
            <FavoriteMovies favoriteMovies={favoriteMovies} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;