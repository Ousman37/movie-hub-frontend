// src/components/MovieReviews.jsx
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";

function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "movies", movieId.toString(), "reviews"),
      where("rating", ">", 3) // Add condition to use 'where'
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = [];
      snapshot.forEach((doc) =>
        reviewsData.push({ ...doc.data(), id: doc.id })
      );
      setReviews(reviewsData);
    });
    return () => unsubscribe();
  }, [movieId]);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Reviews:</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="mb-4 p-2 bg-gray-700 rounded">
            <p className="text-sm text-gray-400">{review.userEmail}</p>
            <p className="text-sm">{review.review}</p>
            <p className="text-sm text-yellow-400">
              Rating: {review.rating}/10
            </p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}

export default MovieReviews;
