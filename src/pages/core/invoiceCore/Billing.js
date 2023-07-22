import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffset } from "../../../operations/dateUtils";
import { setAmount } from "../../../redux/slicers/amount";
import { setInvoice } from "../../../redux/slicers/invoice";
import CustomGridSelect from "../../../components/customComponent/CustomGridSelect";

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

  const toggleFullyPaid = () => {
    dispatch(
      setAmount({
        fullyPaid: !amount.fullyPaid,
        totalAmountPaid: !amount.fullyPaid
          ? amount.totalAmount
          : amount.totalAmountPaid,
      })
    );
  };

  return (
    <div>
      <div className="sectionHeaderWrapper">
        <div className="sectionHeader">Billing</div>
      </div>
      <div className="inputSets">
        <div className="uiInputCont">
          <div className="inputTopBar">
            <label
              className={amount.fullyPaid && "disabled"}
              htmlFor="amountPaid"
            >
              Amount Paid
            </label>

            <div className="actionable">
              <div className="actionableTitle" onClick={toggleFullyPaid}>
                Fully Paid
              </div>
              <div
                onClick={toggleFullyPaid}
                className={`uiToggleSwitcher mini ${
                  amount.fullyPaid && "selected"
                }`}
              ></div>
            </div>
          </div>
          <input
            className={amount.fullyPaid && "disabled"}
            value={amount.totalAmountPaid.toString()}
            onChange={(e) => {
              if (amount.fullyPaid) {
                return;
              }

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
        </div>

        <div className={`uiInputCont ${amount.fullyPaid && "disabled"}`}>
          <div className="inputTopBar">
            <label htmlFor="invoice_due_date">Due Date</label>
          </div>

          <input
            onChange={(e) => {
              if (amount.fullyPaid) {
                return;
              }
              
              dispatch(setInvoice({ invoiceDueDate: e.target.value }));
            }}
            name="invoice_due_date"
            id="invoice_due_date"
            type="date"
            value={invoice.invoiceDueDate}
            min={setOffset(invoice.invoiceDate)}
          ></input>
        </div>

        <div className="uiInputCont">
          <div className="inputTopBar">
            <label>Payment Type</label>
          </div>
          <CustomGridSelect
            values={paymentTypes}
            selected={amount.paymentType}
            onChange={(value) => {
              dispatch(setAmount({ paymentType: value }));
            }}
          />
        </div>
      </div>

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


    </div>
  );
}
