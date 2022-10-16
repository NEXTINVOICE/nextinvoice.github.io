import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Main from "./pages/Main";
import CreatedProfile from "./pages/offauth/CreatedProfile";
import CreateProfile from "./pages/offauth/CreateProfile";
import Login from "./pages/offauth/Login";

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create" element={<CreateProfile />} />
          <Route path="/profile_created" element={<CreatedProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
