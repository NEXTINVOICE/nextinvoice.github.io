import React, { useEffect, useState } from "react";
import sha256 from "crypto-js/sha256";
import { getProfiles, setProfile } from "../../operations/localProfile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import heroLogo from "../../res/heroLogo.png";
import "./createProfile.scss";

export default function CreateProfile() {
  const navigate = useNavigate();
  const profile = useSelector((store) => store.profile);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  useEffect(() => {
    if (profile.user) {
      navigate("/dashboard", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const create = () => {
    setUsernameErr("");
    setPasswordErr("");

    const currUsername = username.toLowerCase().trim();
    const currPassword = password.trim();
    const currPassword2 = password2.trim();

    if (currUsername.length < 4) {
      setUsernameErr("Username length must be 4 characters or above");
      return;
    }

    if (currPassword.length < 4) {
      setPasswordErr("Password length must be 4 characters or above");
      return;
    }

    if (currPassword !== currPassword2) {
      setPasswordErr("Both password is not matching.");
      return;
    }

    const profiles = getProfiles();
    const profileExists = profiles.find((item) => item.user === currUsername);

    if (profileExists) {
      setUsernameErr("Username already exists");
      return;
    } else {
      setProfile({
        user: currUsername,
        password: sha256(currPassword).toString(),
        data: [],
      });
      navigate("/profile_created");
    }
  };

  return (
    <div className="signupPage">
      <div className="heroHeader">
        <img src={heroLogo} alt="next invoice" />
        <p>
          Next <span>Invoice</span>
        </p>
      </div>
      <div className="signupForm">
        <div className="uiInputCont">
          <div className="inputTopBar">
            <label htmlFor="username">Username</label>
          </div>
          <input
            type="text"
            id="username"
            name="username"
            pattern="[A-Za-z]{3}"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
          ></input>
          {usernameErr && <div className="err">{usernameErr}</div>}
        </div>

        <div className="uiInputCont">
          <div className="inputTopBar">
            <label htmlFor="password">Password</label>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          ></input>
        </div>

        <div className="uiInputCont">
          <div className="inputTopBar">
            <label htmlFor="password2">Retype Password</label>
          </div>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value.trim())}
          ></input>
          {passwordErr && <div className="err">{passwordErr}</div>}
        </div>

        <button className="bigUiActionButton signup" onClick={() => create()}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
