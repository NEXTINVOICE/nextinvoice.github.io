import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  address: "",
  mob: "",
  email: "",
};

const customer = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action) => action.payload,
    setCustomerItem: (state, action) => ({ ...state, ...action.payload }),
    resetCustomer: () => initialState,
  },
});

export const { setCustomer, setCustomerItem, resetCustomer } = customer.actions;
export default customer.reducer;
