import { createSlice } from "@reduxjs/toolkit";

const initialState = -1;

const invoiceSeller = createSlice({
  name: "invoiceseller",
  initialState,
  reducers: {
    selectInvoiceSeller: (state, action) => action.payload,
    balanceSeller: (state) => (state = state - 1),
    resetInvoiceSeller: () => initialState,
  },
});

export const { selectInvoiceSeller, balanceSeller, resetInvoiceSeller } =
  invoiceSeller.actions;
export default invoiceSeller.reducer;
