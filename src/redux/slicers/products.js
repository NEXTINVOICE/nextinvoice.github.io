import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    createProduct: (state, action) => {
      state.push(action.payload);
      return state;
    },
    deleteProduct: (state, action) => {
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    },
    replaceProduct: (state, action) => {
      return [
        ...state.slice(0, action.payload.index),
        action.payload.data,
        ...state.slice(action.payload.index + 1),
      ];
    },
    resetProducts: (state, action) => initialState,
  },
});

export const {
  setProducts,
  createProduct,
  deleteProduct,
  replaceProduct,
  resetProducts,
} = products.actions;
export default products.reducer;
