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
    <>
      {invoiceSeller > -1 && invoiceSeller < sellers.length && (
        <div className="sellerListCard sellerCard">
          {sellers[invoiceSeller].photoUrl ? (
            <div
              style={{
                backgroundImage: `url('${sellers[invoiceSeller].photoUrl}')`,
              }}
              className="logoCont"
            ></div>
          ) : (
            <div className="logoCont optional">
              <i class="ri-store-3-fill"></i>
            </div>
          )}

          <div className="infoCont">
            <div className="sellerName">{sellers[invoiceSeller].name}</div>
            <div className="sellerAddress">
              {sellers[invoiceSeller].address}
            </div>
          </div>
          <div className="actionCont">
            <button onClick={() => show(true)}>Change</button>
          </div>
        </div>
      )}
    </>
  );
}
