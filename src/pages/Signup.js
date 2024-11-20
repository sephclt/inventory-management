import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    } else {
      if (!isRegistering) {
        setIsRegistering(true);
        setErrorMessage("");
        try {
          await doCreateUserWithEmailAndPassword(email, password);
          setSuccess(true);
        } catch (err) {
          setErrorMessage("Failed to create an account. Please try again.");
          setIsRegistering(false);
        }
      }
    }
  };

  return (
    <div>
      {success && <Navigate to={"/dashboard"} replace={true} />}
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
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
