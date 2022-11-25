import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectInvoiceSeller } from "../../../redux/slicers/invoiceSeller";

export default function SellerSelector({ show }) {
  const sellers = useSelector((state) => state.sellers);
  const invoiceSeller = useSelector((state) => state.invoiceSeller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (invoiceSeller < 0 || invoiceSeller >= sellers.length) {
      dispatch(
        selectInvoiceSeller(sellers.map((item) => item.isPrimary).indexOf(true))
      );
    }
  }, [sellers, invoiceSeller]);

  return (
    <div>
      <div>
        <h3>Seller Information</h3>
        {invoiceSeller > -1 && invoiceSeller < sellers.length && (
          <div>
            <div>Name: {sellers[invoiceSeller].name}</div>
            <div>Address: {sellers[invoiceSeller].address}</div>
            <div>Mobile: {sellers[invoiceSeller].mob}</div>
          </div>
        )}
      </div>
      <button onClick={() => show(true)}>Change Seller</button>
    </div>
  );
}
