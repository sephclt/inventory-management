import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Signup from "./Signup";
import InventoryForm from "./InventoryForm";
import Edit from "./Edit";
import Feedback from "./Feedback";
import { useAuth } from "../contexts/authContext";
import "../App.css";
import { doSignOut } from "../firebase/auth";

function Home() {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();

  return (
    <div className="Home">
      {/* Navigation Bar */}
      <nav>
        <h1>Inventory Management System</h1>
        {userLoggedIn ? (
          <>
            <NavLink to="/dashboard" activeClassName="active">
              Dashboard
            </NavLink>
            <NavLink to="/inventory/new" activeClassName="active">
              Add Inventory
            </NavLink>
            <NavLink to="/edit" activeClassName="active">
              Edit
            </NavLink>
            <NavLink to="/feedback" activeClassName="active">
              Feedback
            </NavLink>
            <div>
              <strong style={{ color: "white" }}>{currentUser.email}</strong>
            </div>
            <button
              onClick={() => {
                doSignOut().then(() => {
                  navigate("/login");
                });
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
            <NavLink to="/signup" activeClassName="active">
              Sign Up
            </NavLink>
          </>
        )}
      </nav>

      {/* Routes */}
      <main>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory/new" element={<InventoryForm />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </main>
    </div>
  );
}

export default Home;
