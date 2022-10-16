import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Main() {
  const profile = useSelector((store) => store.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile.user) {
      navigate("/dashboard", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Next Invoice</h1>
      <p>Create invoice for free</p>
      <Link to="/login">Login</Link>
      <br></br>
      <Link to="/create">Create Profile</Link>
    </div>
  );
}
