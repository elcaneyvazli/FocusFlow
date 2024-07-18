import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  askai: false,
};

const askaiSlice = createSlice({
  name: "askai",
  initialState,
  reducers: {
    toggleAi: (state) => {
      state.askai = !state.askai;
    },
  },
});

export const { toggleAi } = askaiSlice.actions;
export default askaiSlice.reducer;
