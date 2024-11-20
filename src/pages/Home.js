import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import InventoryForm from "./InventoryForm";
import Feedback from "./Feedback";
import { useAuth } from "../contexts/authContext";
import "../App.css";
import { doSignOut } from "../firebase/auth";

function Home() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

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
            <NavLink to="/feedback" activeClassName="active">
              Feedback
            </NavLink>
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
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
        )}
      </nav>

      {/* Routes */}
      <main>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory/new" element={<InventoryForm />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default Home;
