// src/components/Profile/UserProfile.jsx
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const auth = getAuth();
  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          console.log("User is logged in, fetching profile...");
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Profile data:", docSnap.data());
            setUserProfile(docSnap.data());
          } else {
            console.log("No such document!");
            setError("No user profile found.");
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
          if (err.message.includes("offline")) {
            setError(
              "Failed to fetch data. Please check your network connection."
            );
          } else if (err.code === "permission-denied") {
            setError("Permission denied. Please check Firestore rules.");
          } else {
            setError("An error occurred while fetching the user profile.");
          }
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No user is currently logged in.");
        setLoading(false);
        setError("No user is currently logged in.");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("Selected file:", event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError("No file selected for upload.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setError("No user is currently logged in.");
      return;
    }

    const storageRef = ref(
      storage,
      `profile_pictures/${user.uid}/${selectedFile.name}`
    );
    try {
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("File uploaded successfully. Download URL:", downloadURL);

      // Update user profile document with the profile image URL
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { profileImageUrl: downloadURL });
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        profileImageUrl: downloadURL,
      }));
    } catch (uploadError) {
      console.error("Error uploading file:", uploadError);
      setError("Error uploading file. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      {userProfile ? (
        <div className="profile">
          <h1 className="text-2xl font-bold mb-4">
            {userProfile.name}'s Profile
          </h1>
          {userProfile.profileImageUrl && (
            <img
              src={userProfile.profileImageUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
          )}
          <p>
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(
              userProfile.createdAt.seconds * 1000
            ).toLocaleDateString()}
          </p>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Profile Picture
            </label>
            <input
              type="file"
              className="w-full p-2 mb-4 border rounded text-gray-700"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <div>
                <p>Selected file: {selectedFile.name}</p>
                <button
                  className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
                  onClick={handleFileUpload}
                >
                  Upload
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>No user profile found.</p>
      )}
    </div>
  );
}

export default UserProfile;
