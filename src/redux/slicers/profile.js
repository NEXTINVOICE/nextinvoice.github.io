import { createSlice } from "@reduxjs/toolkit";

const profile = createSlice({
  name: "profile",
  initialState: {
    user: null,
    pass: null,
  },
  reducers: {
    login: (state, action) => action.payload,
    logout: (state) => ({ user: null, pass: null }),
  },
});

export const { login, logout } = profile.actions;
export default profile.reducer;
