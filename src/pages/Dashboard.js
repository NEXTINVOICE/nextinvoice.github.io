import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slicers/profile";

export default function Dashboard() {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile.user) {
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <div>
        <h1>User: {profile.user}</h1>
        <button onClick={() => doLogout()}>Logout</button>
      </div>
    </div>
  );
}
