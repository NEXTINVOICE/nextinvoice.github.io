import { createSlice } from "@reduxjs/toolkit";

const sellers = createSlice({
  name: "sellers",
  initialState: [],
  reducers: {
    setSellers: (state, action) => {
      return action.payload;
    },
    createSeller: (state, action) => {
      state.push(action.payload);
      return state;
    },
    deleteSeller: () => 0,
  },
});

export const { setSellers, createSeller, deleteSeller } = sellers.actions;
export default sellers.reducer;
