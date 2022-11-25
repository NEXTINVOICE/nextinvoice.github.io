import { configureStore } from "@reduxjs/toolkit";
import dummyReducer from "./slicers/dummy";
import profileReducer from "./slicers/profile";
import sellerReducer from "./slicers/seller";
import invoiceSellerReducer from "./slicers/invoiceSeller";
import sellersReducer from "./slicers/sellers";
import customerReducer from "./slicers/customer";
import productsReducer from "./slicers/products";
import amountReducer from "./slicers/amount";
import invoiceReducer from "./slicers/invoice";

export default configureStore(
  {
    reducer: {
      dummy: dummyReducer,
      profile: profileReducer,
      seller: sellerReducer,
      invoiceSeller: invoiceSellerReducer,
      sellers: sellersReducer,
      customer: customerReducer,
      products: productsReducer,
      amount: amountReducer,
      invoice: invoiceReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
