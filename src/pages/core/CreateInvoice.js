import React from "react";
import Billing from "./invoiceCore/Billing";
import Customer from "./invoiceCore/Customer";
import Invoice from "./invoiceCore/Invoice";
import ProductList from "./invoiceCore/ProductList";

export default function CreateInvoice() {
  return (
    <div>
      <h1>Create your Invoice</h1>

      <Invoice />
      <Customer />
      <ProductList />
      <Billing />
    </div>
  );
}
