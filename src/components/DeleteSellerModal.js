import React from "react";
import { useDispatch } from "react-redux";
import { balanceSeller } from "../redux/slicers/invoiceSeller";
import { deleteSeller } from "../redux/slicers/sellers";

export default function DeleteSellerModal({ index, show }) {
  const dispatch = useDispatch();

  const doDeleteSeller = () => {
    dispatch(deleteSeller(index));
    dispatch(balanceSeller());
    show(false);
  };

  return (
    <div className="modal">
      <div className="modal-cont action-modal">
        <div
          className="closeBtn"
          onClick={() => {
            show(false);
          }}
        >
          <i className="ri-close-line"></i>
        </div>
        <div className="modalHeader">
          <div className="title">Delete this seller?</div>
        </div>

        <div className="bottomCont">
          <button
            className="uiColoredIcoBtn"
            onClick={() => {
              doDeleteSeller();
            }}
          >
            Delete
          </button>
          <button
            className="uiColoredIcoBtn red"
            onClick={() => {
              show(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
