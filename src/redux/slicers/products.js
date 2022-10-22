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
      let currIndex = state
        .map((item) => item.name)
        .indexOf(action.payload.name);

      return [
        ...state.slice(0, currIndex),
        action.payload.data,
        ...state.slice(currIndex + 1),
      ];
    },
  },
});

export const { setProducts, createProduct, deleteProduct, replaceProduct } =
  products.actions;
export default products.reducer;
