import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Feedback() {
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
    <form onSubmit={handleSubmit}>
      <h2>Feedback</h2>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        required
      ></textarea>
      <button type="submit">Submit Feedback</button>
    </form>
  );
}
