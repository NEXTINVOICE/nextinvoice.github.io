import { configureStore } from "@reduxjs/toolkit";
import dummyReducer from "./slicers/dummy";
import profileReducer from "./slicers/profile";

export default configureStore(
  {
    reducer: {
      dummy: dummyReducer,
      profile: profileReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
