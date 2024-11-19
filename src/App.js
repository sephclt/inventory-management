import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InventoryForm from "./pages/InventoryForm";
import Feedback from "./pages/Feedback";
import "./App.css";

function App() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation Bar */}
        <nav>
          <h1>Inventory Management System</h1>
          <NavLink to="/dashboard" activeClassName="active">
            Dashboard
          </NavLink>
          <NavLink to="/inventory/new" activeClassName="active">
            Add Inventory
          </NavLink>
          <NavLink to="/feedback" activeClassName="active">
            Feedback
          </NavLink>
          {userEmail ? (
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" activeClassName="active">
                Login
              </NavLink>
              <NavLink to="/signup" activeClassName="active">
                Signup
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
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
