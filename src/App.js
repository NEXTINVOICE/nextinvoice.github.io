import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateSeller from "./pages/core/CreateSeller";
import Dashboard from "./pages/Dashboard";
import Main from "./pages/Main";
import CreatedProfile from "./pages/offauth/CreatedProfile";
import CreateProfile from "./pages/offauth/CreateProfile";
import Login from "./pages/offauth/Login";
import "./App.scss";
import Sellers from "./pages/core/Sellers";

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create" element={<CreateProfile />} />
          <Route path="/profile_created" element={<CreatedProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="seller/create" element={<CreateSeller />} />
            <Route path="sellers" element={<Sellers />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
