import React from "react";
import { useDispatch } from "react-redux";
import { deleteSeller } from "../redux/slicers/sellers";

export default function DeleteSellerModal({ index, show }) {
  const dispatch = useDispatch();

  const doDeleteSeller = () => {
    dispatch(deleteSeller(index));
    show(false);
  };

  return (
    <div className="modal">
      <div className="modal-cont">
        <h2>Delete this seller?</h2>
        <p>This can't be undone.</p>
        <button onClick={() => doDeleteSeller()}>Delete</button>

        <button
          onClick={() => {
            show(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
