import React from "react";
import { getAuth, signOut } from "firebase/auth";

function LogoutButton() {
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
