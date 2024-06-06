// src/components/ReviewForm.jsx
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function ReviewForm({ movieId }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await addDoc(collection(db, "movies", movieId.toString(), "reviews"), {
          review,
          rating,
          userId: user.uid,
          userEmail: user.email,
          timestamp: new Date(),
        });
        setReview("");
        setRating(0);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("You need to log in to submit a review");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 mb-2 text-gray-700"
          placeholder="Write your review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <input
          type="number"
          className="w-full p-2 mb-2 text-gray-700"
          placeholder="Rating (0-10)"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          max="10"
          min="0"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Submit Review
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default ReviewForm;
