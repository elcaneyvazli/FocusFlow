import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setDarkMode, toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
