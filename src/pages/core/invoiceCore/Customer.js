import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerItem } from "../../../redux/slicers/customer";

export default function Customer() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);

  return (
    <div style={{ border: "1px solid black" }}>
      <h2>Customer Information</h2>

      <div>
        <input
          value={customer.name}
          onChange={(e) => {
            dispatch(setCustomerItem({ name: e.target.value }));
          }}
          type="text"
          name="name"
          placeholder="name"
        ></input>
        <input
          value={customer.address}
          onChange={(e) => {
            dispatch(setCustomerItem({ address: e.target.value }));
          }}
          type="text"
          name="address"
          placeholder="address"
        ></input>
        <input
          value={customer.mob}
          onChange={(e) => {
            dispatch(setCustomerItem({ mob: e.target.value }));
          }}
          type="text"
          name="mobile"
          placeholder="mobile"
        ></input>
        <input
          value={customer.email}
          onChange={(e) => {
            dispatch(setCustomerItem({ email: e.target.value }));
          }}
          type="text"
          name="email"
          placeholder="email"
        ></input>
      </div>
    </div>
  );
}
