import React from "react";
import { useSelector } from "react-redux";

export default function Sellers() {
  const sellers = useSelector((store) => store.sellers);
  return (
    <div>
      <h1>Sellers</h1>
      {sellers.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>{item.address}</p>
        </div>
      ))}
    </div>
  );
}
