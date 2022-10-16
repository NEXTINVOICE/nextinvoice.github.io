import { createSlice } from "@reduxjs/toolkit";

const dummy = createSlice({
  name: "dummy",
  initialState: {
    value: 0,
  },
  reducers: {
    func: (state) => {
      return { value: state.value + 1 };
    },
  },
});

export const { func } = dummy.actions;
export default dummy.reducer;
