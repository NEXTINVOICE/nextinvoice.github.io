import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffset } from "../../../operations/dateUtils";
import { setInvoice } from "../../../redux/slicers/invoice";

export default function Invoice() {
  const dispatch = useDispatch();
  const invoice = useSelector((store) => store.invoice);

  return (
    <div className="inputSets">
      <div className="uiInputCont">
        <div className="inputTopBar">
          <label htmlFor="invoice_date">Invoice Date</label>
        </div>

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
          name="invoice_date"
          id="invoice_date"
        ></input>
      </div>
    </div>
  );
}
