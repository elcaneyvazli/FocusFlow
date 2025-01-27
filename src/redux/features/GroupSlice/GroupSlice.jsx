import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newGroup: false,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setToggleGroup: (state) => {
      state.newGroup = !state.newGroup;
    },
  },
});

export const groupReducer = groupSlice.reducer;
export const { setToggleGroup } = groupSlice.actions;
export default groupReducer;
