import React from "react";
import { useSelector } from "react-redux";
import AddProduct from "./AddProduct";
import "./productList.scss";

export default function ProductList({
  setProductIndex,
  showDeleteProductModal,
  showEditProductModal,
}) {
  const products = useSelector((store) => store.products);
  return (
    <div className="productList" style={{ border: "1px solid black" }}>
      <h2>Products</h2>
      {products.length > 0 && (
        <div className="productListTable">
          <div className="header">
            <div>S no</div>
            <div>Item Name</div>
            <div>HSN</div>
            <div>QTY</div>
            <div>GST RATE</div>
            <div>GST Amount</div>
            <div>Cost</div>
            <div>Total Amount</div>
            <div>Actions</div>
          </div>

          {products.map((item, index) => (
            <div key={index} className="header">
              <div>{index + 1}</div>
              <div>{item.name}</div>
              <div>{isNaN(item.hsn) ? "N/A" : item.hsn}</div>
              <div>{item.qty}</div>
              <div>{item.gst}</div>
              <div>{item.gstAmount}</div>
              <div>{item.amount}</div>
              <div>{item.total}</div>
              <div>
                <button
                  onClick={() => {
                    setProductIndex(index);
                    showEditProductModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setProductIndex(index);
                    showDeleteProductModal(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <AddProduct />
    </div>
  );
}
