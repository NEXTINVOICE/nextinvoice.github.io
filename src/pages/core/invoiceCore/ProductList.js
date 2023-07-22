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
    <>
      {products.length > 0 && (
        <>
          <div className="sectionHeaderWrapper extraMargin">
            <div className="sectionHeader box">Product List</div>
          </div>
          <table className="productListTable">
              <tr className="productHeader">
                <th>S no</th>
                <th>Item Name</th>
                <th>HSN</th>
                <th>QTY</th>
                <th>GST RATE</th>
                <th>GST Amount</th>
                <th>Cost</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>

              {products.map((item, index) => (
                <tr key={index} className="productItem">
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{isNaN(item.hsn) ? "N/A" : item.hsn}</td>
                  <td>{item.qty}</td>
                  <td>{item.gst}%</td>
                  <td>{item.gstAmount.toLocaleString()}</td>
                  <td>{item.amount.toLocaleString()}</td>
                  <td>{item.total.toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        setProductIndex(index);
                        showEditProductModal(true);
                      }}
                      title="edit"
                    >
                      <i className="ri-edit-box-line"></i>
                    </button>
                    <button
                      onClick={() => {
                        setProductIndex(index);
                        showDeleteProductModal(true);
                      }}
                      title="delete"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </table>
        </>
      )}

      <AddProduct />
    </>
  );

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
