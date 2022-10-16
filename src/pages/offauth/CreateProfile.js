import React, { useEffect, useState } from "react";
import sha256 from "crypto-js/sha256";
import { getProfiles, setProfile } from "../../operations/localProfile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
    <div>
      <p>Create Profile</p>
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
      <input
        type="text"
        id="password2"
        name="password2"
        placeholder="Retype password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value.trim())}
      ></input>
      <div>{passwordErr}</div>
      <button onClick={() => create()}>Create</button>
    </div>
  );
}
