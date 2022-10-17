import React, { useEffect, useState } from "react";
import sha256 from "crypto-js/sha256";
import { getProfiles } from "../../operations/localProfile";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slicers/profile";
import { setSellers } from "../../redux/slicers/sellers";

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
      console.log(profile);
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
    <div>
      <p>Login</p>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="username"
        pattern="[A-Za-z]{3}"
        value={username}
        onChange={(e) => setUsername(e.target.value.trim())}
      ></input>
      <div>{usernameErr}</div>
      <input
        type="text"
        id="password"
        name="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value.trim())}
      ></input>
      <div>{passwordErr}</div>
      <button onClick={() => doLogin()}>Login</button>
    </div>
  );
}
