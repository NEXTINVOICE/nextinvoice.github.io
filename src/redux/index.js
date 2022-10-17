import { configureStore } from "@reduxjs/toolkit";
import dummyReducer from "./slicers/dummy";
import profileReducer from "./slicers/profile";
import sellerReducer from "./slicers/seller";
import sellersReducer from "./slicers/sellers";

export default configureStore(
  {
    reducer: {
      dummy: dummyReducer,
      profile: profileReducer,
      seller: sellerReducer,
      sellers: sellersReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
