import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffset } from "../../../operations/dateUtils";
import { setAmount } from "../../../redux/slicers/amount";
import { setInvoice } from "../../../redux/slicers/invoice";

export default function Billing() {
  const invoice = useSelector((store) => store.invoice);
  const amount = useSelector((store) => store.amount);
  const products = useSelector((store) => store.products);
  const dispatch = useDispatch();

  const paymentTypes = ["Cash", "Card", "UPI"];
  // const [paymentType, setPaymentType] = useState(() => paymentTypes[0]);

  useEffect(() => {
    let data = {
      itemAmount: 0,
      taxAmount: 0,
      totalAmount: 0,
    };

    products.forEach((item) => {
      data.itemAmount += item.amount * item.qty;
      data.taxAmount += item.gstAmount * item.qty;
      data.totalAmount += item.total;
    });

    data.totalAmount = Math.round(data.totalAmount);

    if (amount.fullyPaid) {
      data.totalAmountPaid = data.totalAmount;
    }

    dispatch(setAmount(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <div style={{ border: "1px solid black" }}>
      <h2>Billing</h2>
      <div>
        <div>
          <b>Item Total:</b>
          {amount.itemAmount}
        </div>
        <div>
          <b>CGST Total:</b>
          {amount.taxAmount / 2}
        </div>
        <div>
          <b>SGST Total:</b>
          {amount.taxAmount / 2}
        </div>
        <div>
          <b>Grand Total:</b>
          {amount.totalAmount}
        </div>
      </div>

      <div>
        <input
          name="fullyPaid"
          id="fullyPaid"
          type="checkbox"
          value={amount.fullyPaid}
          checked={amount.fullyPaid}
          onChange={() =>
            dispatch(
              setAmount({
                fullyPaid: !amount.fullyPaid,
                totalAmountPaid: !amount.fullyPaid
                  ? amount.totalAmount
                  : amount.totalAmountPaid,
              })
            )
          }
        ></input>
        <label htmlFor="includeInvoiceDueDate">Fully paid</label>
      </div>

      <div className={`${amount.fullyPaid && "disabled"}`}>
        <label htmlFor="amountPaid">Amount Paid</label>
        <br></br>
        <input
          value={amount.totalAmountPaid.toString()}
          onChange={(e) => {
            let currAmount = parseInt(e.target.value);

            if (currAmount > amount.totalAmount)
              currAmount = amount.totalAmount;
            dispatch(setAmount({ totalAmountPaid: currAmount }));
          }}
          max={amount.totalAmount}
          id="amountPaid"
          type="number"
          name="amountPaid"
        ></input>
        <div>
          <p>Due Date</p>
          <input
            onChange={(e) => {
              dispatch(setInvoice({ invoiceDueDate: e.target.value }));
            }}
            type="date"
            value={invoice.invoiceDueDate}
            min={setOffset(invoice.invoiceDate)}
          ></input>
        </div>
      </div>

      <div>
        <p>Payment type</p>
        <select
          value={amount.paymentType}
          onChange={(e) => dispatch(setAmount({ paymentType: e.target.value }))}
        >
          {paymentTypes.map((item, key) => (
            <option key={key}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
