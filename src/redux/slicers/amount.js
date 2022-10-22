import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemAmount: 0,
  taxAmount: 0,
  fullyPaid: true,
  totalAmount: 0,
  totalAmountPaid: 0,
  paymentType: "Cash",
};

const amount = createSlice({
  name: "amount",
  initialState,
  reducers: {
    setAmount: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetAmount: () => initialState,
  },
});

export const { setAmount, resetAmount } = amount.actions;
export default amount.reducer;
