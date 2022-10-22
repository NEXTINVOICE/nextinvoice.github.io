import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../redux/slicers/products";
import HsnModal from "../../../components/HsnModal";
import { productNormalizer } from "../../../operations/normalizer";
import { productValidator } from "../../../operations/validators";
import "./addProduct.scss";
import { processProduct } from "../../../operations/processor";

export default function AddProduct() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const [hsn, setHsn] = useState("");
  const [gst, setGst] = useState("0");
  const [showHsnModal, setShowHsnModal] = useState(false);

  const [qty, setQty] = useState("1");
  const [amount, setAmount] = useState("0");

  const [validations, setValidations] = useState([]);

  const resetValues = () => {
    setName("");
    setHsn("");
    setGst("0");
    setQty("1");
    setAmount("0");
    setValidations([]);
  };

  const doAddItem = () => {
    const data = {
      name: name,
      hsn: hsn,
      gst: gst,
      qty: qty,
      amount: amount,
    };
    const retValidations = productValidator(data);
    setValidations(retValidations);

    if (retValidations.length > 0) return;

    const normalizedData = productNormalizer(data);
    const processedData = processProduct(normalizedData);
    dispatch(createProduct(processedData));
    resetValues();
  };

  return (
    <div>
      <h3>Add Product</h3>
      <div className="inputSets">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          placeholder="Item name"
        ></input>
        <div>
          <div>
            <b>Item type</b>
          </div>
          <div>HSN: {hsn ? hsn : "N/A"} </div>
          <div>GST: {gst}</div>
          <button onClick={() => setShowHsnModal(true)}>Set Gst</button>
        </div>

        <div>
          <label htmlFor="quantityInput">Quantity</label>
          <br></br>
          <input
            value={qty}
            onChange={(e) => {
              if (e.target.value === "0") return;
              setQty(e.target.value);
            }}
            type="number"
            placeholder="enter quantity"
            min="1"
            name="quantityInput"
          ></input>
        </div>

        <div>
          <label htmlFor="amountInput">Item Amount</label>
          <br></br>
          <input
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            type="number"
            placeholder="enter amount"
            name="amountInput"
          ></input>
        </div>

        {validations.map((item, index) => (
          <div key={index}>{item}</div>
        ))}

        <button onClick={() => doAddItem()}>Add Item</button>

        {showHsnModal && (
          <HsnModal
            show={setShowHsnModal}
            setMainHsn={setHsn}
            setMainGst={setGst}
          />
        )}

        {/* <HsnSelector /> */}
      </div>
    </div>
  );
}