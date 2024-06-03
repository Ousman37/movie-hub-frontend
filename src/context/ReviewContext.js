// import React, { createContext, useState } from "react";
// import { db } from "../firebase-config";
// import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// export const ReviewContext = createContext();

// export const ReviewProvider = ({ children }) => {
//   const [reviews, setReviews] = useState({});

//   const addReview = async (movieId, reviewText) => {
//     try {
//       await addDoc(collection(db, "reviews"), {
//         movieId,
//         reviewText,
//       });
//       fetchReviews(movieId);
//     } catch (error) {
//       console.error("Error adding review:", error);
//     }
//   };

//   const fetchReviews = async (movieId) => {
//     try {
//       const q = query(
//         collection(db, "reviews"),
//         where("movieId", "==", movieId)
//       );
//       const querySnapshot = await getDocs(q);
//       const movieReviews = querySnapshot.docs.map(
//         (doc) => doc.data().reviewText
//       );
//       setReviews((prevReviews) => ({
//         ...prevReviews,
//         [movieId]: movieReviews,
//       }));
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     }
//   };

//   return (
//     <ReviewContext.Provider value={{ reviews, addReview, fetchReviews }}>
//       {children}
//     </ReviewContext.Provider>
//   );
// };
