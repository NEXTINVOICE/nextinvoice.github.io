import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function CreatedProfile() {
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
      <h1>You successfully created your profile.</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}
