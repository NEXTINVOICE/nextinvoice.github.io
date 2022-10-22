import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffset } from "../../../operations/dateUtils";
import { setInvoice } from "../../../redux/slicers/invoice";

export default function Invoice() {
  const dispatch = useDispatch();
  const invoice = useSelector((store) => store.invoice);

  return (
    <div style={{ border: "1px solid black" }}>
      <h2>Invoice Preferences</h2>
      <div>
        <p>Invoice Date</p>
        <input
          onChange={(e) => {
            let data = {
              invoiceDate: e.target.value,
            };
            const invoiceDate = new Date(e.target.value).getTime();
            const dueDate = new Date(invoice.invoiceDueDate).getTime();

            if (invoiceDate >= dueDate) {
              data.invoiceDueDate = setOffset(invoiceDate);
            }

            dispatch(setInvoice(data));
          }}
          type="date"
          value={invoice.invoiceDate}
        ></input>
      </div>
    </div>
  );
}
