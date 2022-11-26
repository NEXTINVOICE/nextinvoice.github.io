import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import heroLogo from "../res/heroLogo.png";
import "./main.scss";

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
    <div className="rootHero">
      <div className="heroHeader">
        <img src={heroLogo} alt="next invoice" />
        <p>
          Next <span>Invoice</span>
        </p>
      </div>
      <div className="heroSubHeader">
        An effective way to create invoices for free
      </div>

      <div className="heroActions">
        <Link className="anchorButton login" to="/login">
          <i class="ri-login-circle-line"></i>
          Login
        </Link>
        <Link className="anchorButton signup" to="/create">
          <i class="ri-user-add-line"></i>
          Create Profile
        </Link>
      </div>

      {/* <h1>Next Invoice</h1>
      <p>Create invoice for free</p>
      <Link to="/login">Login</Link>
      <br></br>
      <Link to="/create">Create Profile</Link> */}
    </div>
  );
}
