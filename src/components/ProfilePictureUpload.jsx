import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePictureUpload = () => {
  const { currentUser } = useAuth();
  const [profilePicture, setProfilePicture] = useState(
    currentUser.profilePicture
  );

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="text-center mb-4">
      <img
        src={profilePicture || "https://via.placeholder.com/150"}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-2"
      />
      <input
        type="file"
        onChange={handleProfilePictureChange}
        className="block mx-auto mt-2"
      />
    </div>
  );
};

export default ProfilePictureUpload;
