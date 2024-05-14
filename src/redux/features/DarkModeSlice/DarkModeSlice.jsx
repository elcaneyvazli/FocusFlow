import { createSlice } from "@reduxjs/toolkit";
import { useTheme } from "next-themes";


const initialState = {
  value: {
    darkMode: null,
  },
};

export const darkMode = createSlice({
  name: "darkmode",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.value.darkMode = action.payload;
    },
  },
});

export const { toggleDark, setDarkMode } = darkMode.actions;
export const darkModeReducer = darkMode.reducer;

export default darkModeReducer;
