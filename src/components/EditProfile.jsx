import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const EditProfile = () => {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");

  const handleUpdateProfile = () => {
    // Update profile logic here
    alert("Profile updated");
  };

  return (
    <div className="text-center mb-4">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="block w-full p-2 mb-4 border rounded text-black"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="block w-full p-2 mb-4 border rounded text-black"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
        className="block w-full p-2 mb-4 border rounded text-black"
      />
      <button
        onClick={handleUpdateProfile}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Profile
      </button>
    </div>
  );
};

export default EditProfile;
