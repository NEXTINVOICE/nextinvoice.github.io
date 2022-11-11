import React from "react";
import { useSelector } from "react-redux";

export default function SellerSelector({ show }) {
  const seller = useSelector((state) => state.seller);
  return (
    <div>
      <div>
        <h3>Seller Information</h3>
        <div>
          <div>Name: {seller.name}</div>
          <div>Address: {seller.address}</div>
          <div>Mobile: {seller.mob}</div>
        </div>
      </div>
      <button onClick={() => show(true)}>Change Seller</button>
    </div>
  );
}
