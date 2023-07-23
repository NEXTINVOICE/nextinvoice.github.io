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
import heroLogo from "../../../res/logo2.png";
import "./LoadingPage.scss";

export default function TemplatePreview({ templateNumber = 0 }) {
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

  return (
    <div>
      {templateNumber === 0 && (
        <TypeA hide={false} invoiceNumber={invoiceNumber} />
      )}
    </div>
  );
}
