import { createSlice } from "@reduxjs/toolkit";

const sellers = createSlice({
  name: "sellers",
  initialState: [],
  reducers: {
    setSellers: (state, action) => {
      return action.payload;
    },
    createSeller: (state, action) => {
      if (state.length === 0) {
        state.push({ ...action.payload, isPrimary: true });
        return state;
      }

      if (action.payload.isPrimary) {
        const newState = state.map((item) => ({ ...item, isPrimary: false }));
        newState.push(action.payload);
        return newState;
      }

      state.push(action.payload);
      return state;
    },
    deleteSeller: (state, action) => {
      if (state.length > 1 && state[action.payload].isPrimary) {
        const newState = state.map((item) => ({ ...item }));
        const anotherNewState = [
          ...newState.slice(0, action.payload),
          ...newState.slice(action.payload + 1),
        ];

        return anotherNewState.map((item, index) => {
          item.isPrimary = index === 0;
          return item;
        });
      }
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    },
    replaceSeller: (state, action) => {
      let currIndex = state
        .map((item) => item.name)
        .indexOf(action.payload.name);

      if (action.payload.data.isPrimary) {
        const newState = state.map((item) => ({ ...item, isPrimary: false }));

        return [
          ...newState.slice(0, currIndex),
          action.payload.data,
          ...newState.slice(currIndex + 1),
        ];
      }

      if (
        state.length > 1 &&
        state[currIndex].isPrimary &&
        action.payload.data.isPrimary === false
      ) {
        let newPrimaryIndex = 0;
        for (let i = 0; i < state.length; i++) {
          if (currIndex !== i) {
            newPrimaryIndex = i;
            break;
          }
        }

        const newState = state.map((item, index) => ({
          ...item,
          isPrimary: index === newPrimaryIndex,
        }));

        return [
          ...newState.slice(0, currIndex),
          action.payload.data,
          ...newState.slice(currIndex + 1),
        ];
      }

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
