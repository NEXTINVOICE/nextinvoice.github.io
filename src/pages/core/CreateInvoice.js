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

export default function CreateInvoice() {
  // Modal states
  const [showSetSellerModal, setShowSetSellerModal] = useState(false);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const sellers = useSelector((state) => state.sellers);
  const customer = useSelector((state) => state.customer);
  const products = useSelector((state) => state.products);
  const [validation, setValidation] = useState([]);

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
    <div>
      <h1>Create your Invoice</h1>
      <Invoice />
      <SellerSelector show={setShowSetSellerModal} />
      <Customer />
      <ProductList
        setProductIndex={setProductIndex}
        showDeleteProductModal={setShowDeleteProductModal}
        showEditProductModal={setShowEditProductModal}
      />
      <Billing />

      <div>
        {validation.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      <button onClick={() => generateInvoice()}>Generate Invoice</button>

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
