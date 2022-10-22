import { createSlice } from "@reduxjs/toolkit";
import { getCurrDate } from "../../operations/dateUtils";

const initialState = {
  invoiceDate: getCurrDate(),
  invoiceDueDate: getCurrDate(1),
};

const invoice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoice: (state, action) => ({ ...state, ...action.payload }),
    resetInvoice: () => initialState,
  },
});

export const { setInvoice, resetInvoice } = invoice.actions;
export default invoice.reducer;
