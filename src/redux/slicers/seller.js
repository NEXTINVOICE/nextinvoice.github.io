import { createSlice } from "@reduxjs/toolkit";

const seller = createSlice({
  name: "seller",
  initialState: {
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
  },
  reducers: {
    selectSeller: () => 0,
    resetSeller: () => 0,
  },
});

export const { selectSeller, resetSeller } = seller.actions;
export default seller.reducer;
