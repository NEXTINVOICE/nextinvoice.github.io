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
    console.log(hsn);
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
      <div className="modal-cont">
        <h2>Edit Product</h2>
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

          {showHsnModal && (
            <HsnModal
              show={setShowHsnModal}
              setMainHsn={setHsn}
              setMainGst={setGst}
            />
          )}

          {/* <HsnSelector /> */}
        </div>

        <button onClick={() => doEditProduct()}>Apply</button>
        <button onClick={() => resetValues()}>Reset</button>
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
