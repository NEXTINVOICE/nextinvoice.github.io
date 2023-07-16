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
          <div className="title">Delete Product</div>
        </div>

        <div className="bottomCont">
          <button
            className="uiColoredIcoBtn"
            onClick={() => {
              doDeleteProduct();
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
