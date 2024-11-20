import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/authContext";

export default function Feedback() {
  const { userLoggedIn } = useAuth();
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "feedbacks"), {
        message: feedback,
      });
      alert(`Feedback Submitted: ${feedback}`);
      setFeedback("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      {!userLoggedIn ? (
        <h2>Please login to submit feedback</h2>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Feedback</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </>
  );
}
