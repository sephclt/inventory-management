import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore(getApp()); // Initialize Firestore
    try {
      await addDoc(collection(db, "users"), {
        email: email,
        password: password,
      });
      alert("Signup form submitted!");
      navigate("/login"); // Redirect to Login page
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
