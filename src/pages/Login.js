import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";

export default function Login() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setError("");
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (err) {
        setError(
          "Failed to sign in. Please check your credentials and try again."
        );
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to={"/dashboard"} replace={true} />}
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
        <button type="submit" disabled={isSigningIn}>
          Login
        </button>
      </form>
    </div>
  );
}
