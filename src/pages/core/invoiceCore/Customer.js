import React, { useState } from "react";

export default function Customer() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mob, setMob] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div style={{ border: "1px solid black" }}>
      <h2>Customer Information</h2>

      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          placeholder="name"
        ></input>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          name="address"
          placeholder="address"
        ></input>
        <input
          value={mob}
          onChange={(e) => setMob(e.target.value)}
          type="text"
          name="mobile"
          placeholder="mobile"
        ></input>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="email"
        ></input>
      </div>
    </div>
  );
}
