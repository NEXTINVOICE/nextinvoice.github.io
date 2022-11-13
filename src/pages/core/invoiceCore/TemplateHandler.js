import html2pdf from "html-to-pdf-js";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCustomer } from "../../../redux/slicers/customer";
import { resetInvoice } from "../../../redux/slicers/invoice";
import { resetSeller } from "../../../redux/slicers/seller";
import { resetAmount } from "../../../redux/slicers/amount";
import TypeA from "./templates/invoice/TypeA";
import { resetProducts } from "../../../redux/slicers/products";

export default function TemplateHandler({ templateNumber = 0 }) {
  const [state, setState] = useState(false);
  const [isDone, setDone] = useState(false);
  const [isErr, setErr] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const seller = useSelector((state) => state.seller);
  const customer = useSelector((state) => state.customer);
  const products = useSelector((state) => state.products);
  const invoice = useSelector((state) => state.invoice);
  const amount = useSelector((state) => state.amount);
  const invoiceNumber =
    seller.name[0].toUpperCase() + "INV" + Date.now().toString();

  useEffect(() => {
    if (state)
      generatePDF()
        .then(() => {
          if (seller.generateInv) {
            const element = document.createElement("a");
            const file = new Blob(
              [
                JSON.stringify({
                  invoice,
                  amount,
                  seller,
                  customer,
                  products,
                }),
              ],
              {
                type: "text/plain",
              }
            );
            element.href = URL.createObjectURL(file);
            element.download = `${invoiceNumber}.inv`;
            document.body.appendChild(element);
            element.click();
          }

          setDone(true);
        })
        .catch((e) => {
          setDone(true);
          setErr(true);
        });

    setTimeout(() => {
      if (!state) setState(true);
    }, [2]);
  }, [state]);

  const generatePDF = () => {
    return new Promise(async (resolve, reject) => {
      var element = document.getElementById(
        templateNumber === 0 ? "invoiceTypeA" : "invoiceTypeB"
      );
      try {
        const x = await html2pdf()
          .set({
            margin: 0.3,
            filename: `${invoiceNumber}.pdf`,
            image: { type: "jpeg", quality: 1 },
            html2canvas: { useCORS: true, scale: 4, letterRendering: true },
            jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
          })
          .from(element)
          .save();

        resolve(x);
      } catch (e) {
        reject(e);
      }
    });
  };

  const resetProgress = () => {
    setDone(false);
    setErr(false);
    navigate(-1, { replace: true });
  };

  const createAnotherOne = () => {
    setDone(false);
    setErr(false);
    dispatch(resetSeller());
    dispatch(resetCustomer());
    dispatch(resetInvoice());
    dispatch(resetAmount());
    dispatch(resetProducts());
    navigate("/dashboard/invoice/create");
  };

  return (
    <div>
      {templateNumber === 0 && (
        <TypeA hide={true} invoiceNumber={invoiceNumber} />
      )}

      <div className="progressSection">
        {!isDone && <div>Please Wait</div>}

        {isDone && !isErr && (
          <div>
            Generated{" "}
            <button onClick={() => createAnotherOne()}>
              Create Another one
            </button>
            <button onClick={() => resetProgress()}>Close</button>
          </div>
        )}
        {isDone && isErr && (
          <div>
            Failed <button onClick={() => resetProgress()}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
