import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  address: null,
  mob: null,
  email: null,
  photoUrl: null,
  pan: null,
  bankName: null,
  bankBranch: null,
  bankIFSC: null,
  gstNumber: null,
  termsAndConditions: null,
  digitalSignName: null,
  digitalSignType: null,
  invoiceDesignType: null,
  includeBankDetails: null,
  includeTermsAndConditions: null,
};

const seller = createSlice({
  name: "seller",
  initialState,
  reducers: {
    selectSeller: (state, action) => action.payload,
    resetSeller: () => initialState,
  },
});

export const { selectSeller, resetSeller } = seller.actions;
export default seller.reducer;
