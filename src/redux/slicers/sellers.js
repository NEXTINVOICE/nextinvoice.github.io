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
    deleteSeller: (state, action) => {
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    },
  },
});

export const { setSellers, createSeller, deleteSeller } = sellers.actions;
export default sellers.reducer;
