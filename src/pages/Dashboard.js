import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { getProfiles, saveProfiles } from "../operations/localProfile";
import { logout } from "../redux/slicers/profile";

export default function Dashboard() {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.profile);
  const sellers = useSelector((store) => store.sellers);
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

  const doSaveLogout = () => {
    const profiles = getProfiles();
    const currProfile = profiles.find((item) => item.user === profile.user);
    currProfile.data = sellers;
    saveProfiles(profiles);
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <div>
        <h1>User: {profile.user}</h1>
        <button onClick={() => doLogout()}>Logout</button>
        <button onClick={() => doSaveLogout()}>Save and Logout</button>
      </div>

      <div>
        <h2>Actions</h2>
        <button onClick={() => navigate("/dashboard/seller/create")}>
          Create Seller
        </button>
        <button onClick={() => navigate("/dashboard/invoice/create")}>
          Create Invoice
        </button>
        <button onClick={() => navigate("/dashboard/sellers")}>Sellers</button>
      </div>

      <Outlet />
    </div>
  );
}
