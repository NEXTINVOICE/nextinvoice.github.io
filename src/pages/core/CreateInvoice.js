import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteProductModal from "../../components/DeleteProductModal";
import EditProductModal from "../../components/EditProductModal";
import SellerModal from "../../components/SellerModal";
import { customerNormalizer } from "../../operations/normalizer";
import { customerValidator } from "../../operations/validators";
import { setCustomer } from "../../redux/slicers/customer";
import { selectSeller } from "../../redux/slicers/seller";
import Billing from "./invoiceCore/Billing";
import Customer from "./invoiceCore/Customer";
import Invoice from "./invoiceCore/Invoice";
import ProductList from "./invoiceCore/ProductList";
import SellerSelector from "./invoiceCore/SellerSelector";
import ValidationBox from "./ValidationBox";

export default function CreateInvoice() {
  // Modal states
  const [showSetSellerModal, setShowSetSellerModal] = useState(false);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const sellers = useSelector((state) => state.sellers);
  const invoiceSeller = useSelector((state) => state.invoiceSeller);
  const customer = useSelector((state) => state.customer);
  const products = useSelector((state) => state.products);
  const [validation, setValidation] = useState([]);
  const [showValidationBox, setShowValidationBox] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (sellers.length > 0) {
      dispatch(selectSeller(sellers[0]));
    }
  }, []);

  if (sellers.length === 0) {
    return (
      <div>
        <h1>You haven't added any seller</h1>
        <button
          onClick={() => {
            navigate("/dashboard/seller/create");
          }}
        >
          Add seller
        </button>
      </div>
    );
  }

  const generateInvoice = () => {
    const validationResults = customerValidator(customer);
    const normalizedCustomerData = customerNormalizer(customer);
    dispatch(setCustomer(normalizedCustomerData));

    if (products.length < 1) {
      validationResults.push("Add at least one product");
    }

    setValidation(validationResults);
    if (validationResults.length > 0) return;

    navigate("/dashboard/invoice/generate");
  };

  return (
    <div className="boardWrapper sellersPage sellerPage customScroll2">
      <div className="boardTitle">
        <i onClick={() => navigate(-1)} className="ri-arrow-left-s-line"></i>
        Create Invoice
      </div>
      <div className="scrollWrapper">
        <div className="sectionHeaderWrapper">
          <div className="sectionHeader">Current Seller</div>
        </div>
        <SellerSelector show={showSetSellerModal} />

        <div className="sectionHeaderWrapper extraMargin">
          <div className="sectionHeader box">Invoice Preferences</div>
        </div>
        <Invoice />

        <div className="sectionHeaderWrapper extraMargin">
          <div className="sectionHeader box">Customer Details</div>
        </div>
        <Customer />
      </div>

      <div className="bottomActionBar">
        <button className="uiColoredIcoBtn" onClick={() => generateInvoice()}>
          <i className="ri-save-2-line"></i>Generate Invoice
        </button>
        <button
          className="uiColoredIcoBtn red"
          onClick={() => navigate(-1, { replace: true })}
        >
          <i className="ri-close-circle-line"></i>Cancel
        </button>

        <button
          className="uiColoredIcoBtn green disabled"
          onClick={() => navigate(-1, { replace: true })}
        >
          <i className="ri-restart-fill"></i>Reset
        </button>
        {validation.length > 0 && (
          <button
            className="uiColoredSpecBtn validationBtn"
            onClick={
              !showValidationBox ? () => setShowValidationBox(true) : null
            }
          >
            <ValidationBox
              showValidationBox={showValidationBox}
              setShowValidationBox={setShowValidationBox}
              validation={validation}
            />
            <i className="ri-error-warning-line"></i>
            <div>Validation Error</div>
          </button>
        )}
      </div>

      <ProductList
        setProductIndex={setProductIndex}
        showDeleteProductModal={setShowDeleteProductModal}
        showEditProductModal={setShowEditProductModal}
      />
      <Billing />

      {showEditProductModal && (
        <EditProductModal index={productIndex} show={setShowEditProductModal} />
      )}

      {showDeleteProductModal && (
        <DeleteProductModal
          index={productIndex}
          show={setShowDeleteProductModal}
        />
      )}

      {showSetSellerModal && <SellerModal show={setShowSetSellerModal} />}
    </div>
  );
}
