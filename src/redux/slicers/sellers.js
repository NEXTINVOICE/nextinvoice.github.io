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
    replaceSeller: (state, action) => {
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

export const { setSellers, createSeller, deleteSeller, replaceSeller } =
  sellers.actions;
export default sellers.reducer;
