import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSeller } from "../redux/slicers/seller";
import "./sellerModal.scss";

export default function SellerModal({ show }) {
  const sellers = useSelector((state) => state.sellers);
  const dispatch = useDispatch();

  const apply = (item) => {
    dispatch(selectSeller(item));
    show(false);
  };

  return (
    <div className="modal">
      <div className="modal-cont">
        <div>Select seller</div>
        <div className="sellerList">
          {sellers.map((item, key) => (
            <div key={key} className="sellerItem" onClick={() => apply(item)}>
              <div>{item.name}</div>
              <div>{item.address}</div>
              <div>{item.mob}</div>
              <div>{item.gstNumber}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            show(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
