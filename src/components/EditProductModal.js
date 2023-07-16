import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productNormalizer } from "../operations/normalizer";
import { processProduct } from "../operations/processor";
import { productValidator } from "../operations/validators";
import { replaceProduct } from "../redux/slicers/products";
import HsnModal from "./HsnModal";

export default function EditProductModal({ index, show }) {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products);

  const [name, setName] = useState(() => products[index].name);
  const [hsn, setHsn] = useState(() => products[index].hsn?.toString());
  const [gst, setGst] = useState(() => products[index].gst.toString());
  const [showHsnModal, setShowHsnModal] = useState(false);
  const [qty, setQty] = useState(() => products[index].qty.toString());
  const [amount, setAmount] = useState(() => products[index].amount.toString());
  const [validations, setValidations] = useState([]);

  const doEditProduct = () => {
    // console.log(hsn);
    const data = {
      name: name,
      hsn: hsn,
      gst: gst,
      qty: qty,
      amount: amount,
    };
    const retValidations = productValidator(data);
    console.log(data);
    console.log(retValidations);
    setValidations(retValidations);

    if (retValidations.length > 0) return;

    const normalizedData = productNormalizer(data);
    const processedData = processProduct(normalizedData);
    dispatch(replaceProduct({ index, data: processedData }));
    show(false);
  };

  const resetValues = () => {
    setName(products[index].name);
    setHsn(products[index].hsn?.toString());
    setGst(products[index].gst.toString());
    setQty(products[index].qty.toString());
    setAmount(products[index].amount.toString());
    setValidations([]);
  };

  return (
    <div className="modal">
      <div className="modal-cont edit-modal">
        <div
          className="closeBtn"
          onClick={() => {
            show(false);
          }}
        >
          <i className="ri-close-line"></i>
        </div>
        <div className="modalHeader">
          <div className="title">Edit Product</div>
        </div>

        <div className="inputSets">
          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="product_edit_name">Item Name</label>
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="product_edit_name"
              id="product_edit_name"
            ></input>
          </div>

          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="product_edit_quantity">Quantity</label>
            </div>
            <input
              value={qty}
              onChange={(e) => {
                if (e.target.value === "0") return;
                setQty(e.target.value);
              }}
              type="number"
              placeholder="enter quantity"
              min="1"
              name="product_edit_quantity"
              id="product_edit_quantity"
            ></input>
          </div>

          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="product_edit_amount">Item Amount</label>
            </div>
            <input
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type="number"
              name="product_edit_amount"
              id="product_edit_amount"
            ></input>
          </div>
        </div>

        <div className="inputSets">
          <div className="uiInputCont">
            <div className="inputTopBar">
              <label onClick={() => setShowHsnModal(true)} htmlFor="">
                Item Type
              </label>
            </div>
            <div className="inputType">
              <div>
                <div className="header">HSN</div>
                <div className="info">{hsn ? hsn : "N/A"}</div>
              </div>

              <div>
                <div className="header">GST</div>
                <div className="info">{gst}</div>
              </div>

              <button onClick={() => setShowHsnModal(true)}>
                <i className="ri-edit-box-line"></i>
                Edit
              </button>
            </div>
          </div>
          {validations.length > 0 && (
            <div className="uiInputCont validationError">
              <div className="errorHeader">
                <i className="ri-error-warning-line"></i>
                Missing fields
              </div>
              <div className="errors">
                {validations.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bottomCont">
          <button
            className="uiColoredIcoBtn green"
            onClick={() => {
              resetValues(false);
            }}
          >
            Reset
          </button>
          <button
            className="uiColoredIcoBtn"
            onClick={() => {
              doEditProduct();
            }}
          >
            Apply
          </button>
          <button
            className="uiColoredIcoBtn red"
            onClick={() => {
              show(false);
            }}
          >
            Close
          </button>
        </div>

        {showHsnModal && (
          <HsnModal
            show={setShowHsnModal}
            setMainHsn={setHsn}
            setMainGst={setGst}
            mainHsn={hsn}
            mainGst={gst}
          />
        )}
      </div>
    </div>
  );
}
