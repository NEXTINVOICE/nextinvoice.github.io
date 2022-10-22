import React, { useState } from "react";
import DeleteProductModal from "../../components/DeleteProductModal";
import Billing from "./invoiceCore/Billing";
import Customer from "./invoiceCore/Customer";
import Invoice from "./invoiceCore/Invoice";
import ProductList from "./invoiceCore/ProductList";

export default function CreateInvoice() {
  // Modal states
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  return (
    <div>
      <h1>Create your Invoice</h1>

      <Invoice />
      <Customer />
      <ProductList
        setProductIndex={setProductIndex}
        showDeleteProductModal={setShowDeleteProductModal}
      />
      <Billing />

      {showDeleteProductModal && (
        <DeleteProductModal
          index={productIndex}
          show={setShowDeleteProductModal}
        />
      )}
    </div>
  );
}
