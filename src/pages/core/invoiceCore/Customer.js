import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerItem } from "../../../redux/slicers/customer";

export default function Customer() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);

  return (
    <>
      <div className="inputSets">
        <div className="uiInputCont">
          <div className="inputTopBar">
            <label htmlFor="name">Customer Name</label>
          </div>
          <input
            value={customer.name}
            onChange={(e) => {
              dispatch(setCustomerItem({ name: e.target.value }));
            }}
            type="text"
            name="name"
            id="name"
          ></input>
        </div>

        <div className="uiInputCont">
          <div className="inputTopBar">
            <label htmlFor="address">Customer Address</label>
          </div>
          <textarea
            value={customer.address}
            onChange={(e) => {
              dispatch(setCustomerItem({ address: e.target.value }));
            }}
            type="text"
            name="address"
            id="address"
          ></textarea>
        </div>
      </div>

      <div className="inputSets">
        <div className="uiInputCont">
          <div className="inputTopBar">
            <label htmlFor="mobile">Mobile Number</label>
          </div>
          <input
            value={customer.mob}
            onChange={(e) => {
              dispatch(setCustomerItem({ mob: e.target.value }));
            }}
            type="text"
            name="mobile"
            id="mobile"
          ></input>
        </div>

        <div className="uiInputCont">
          <div className="inputTopBar">
            <label htmlFor="email">Email</label>
          </div>
          <input
            value={customer.email}
            onChange={(e) => {
              dispatch(setCustomerItem({ email: e.target.value }));
            }}
            type="text"
            name="email"
            id="email"
          ></input>
        </div>
      </div>
    </>
  );
}
