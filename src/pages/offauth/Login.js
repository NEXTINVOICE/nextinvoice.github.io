import React, { useEffect, useState } from "react";
import sha256 from "crypto-js/sha256";
import { getProfiles } from "../../operations/localProfile";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slicers/profile";
import { setSellers } from "../../redux/slicers/sellers";
import heroLogo from "../../res/heroLogo.png";
import "./login.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.profile);

  useEffect(() => {
    if (profile.user) {
      navigate("/dashboard", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doLogin = () => {
    setUsernameErr("");
    setPasswordErr("");

    const currUsername = username.toLowerCase().trim();
    const currPassword = password.trim();

    if (currUsername.length < 4) {
      setUsernameErr("Username length must be 4 characters or above");
      return;
    }

    if (currPassword.length < 4) {
      setPasswordErr("Password length must be 4 characters or above");
      return;
    }

    const profiles = getProfiles();
    const profile = profiles.find((item) => item.user === currUsername);

    if (!profile) {
      setUsernameErr("Username doesn't exists");
      return;
    } else {
      const hashPass = sha256(currPassword).toString();

      if (profile.password !== hashPass) {
        setPasswordErr("Incorrect Password");
        return;
      }

      dispatch(login({ user: profile.user, password: profile.password }));
      dispatch(setSellers(profile.data));
      navigate("/dashboard");
    }
  };

  return (
    <div className="loginPage">
      <div className="heroHeader">
        <img src={heroLogo} alt="next invoice" />
        <p>
          Next <span>Invoice</span>
        </p>
      </div>
      <div className="loginForm">
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
          {passwordErr && <div className="err">{passwordErr}</div>}
        </div>

        <div className="authSwitchTip">
          Don’t have account? <Link to="/create">Sign Up</Link>
        </div>

        <button className="bigUiActionButton login" onClick={() => doLogin()}>
          LOGIN
        </button>
      </div>
    </div>
  );
}
