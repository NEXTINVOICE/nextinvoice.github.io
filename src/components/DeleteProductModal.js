import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/slicers/products";

export default function DeleteProductModal({ index, show }) {
  const dispatch = useDispatch();

  const doDeleteProduct = () => {
    dispatch(deleteProduct(index));
    show(false);
  };

  return (
    <div className="modal">
      <div className="modal-cont">
        <h2>Want to delete this item?</h2>
        <p>This can't be undone.</p>
        <button onClick={() => doDeleteProduct()}>Delete</button>

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
