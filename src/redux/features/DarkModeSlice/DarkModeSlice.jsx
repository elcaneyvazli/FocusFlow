import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  darkMode: false,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      updateTheme(state.darkMode);
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      updateTheme(state.darkMode);
    },
    initializeDarkMode: (state) => {
      const themeFromCookie = Cookies.get("theme");
      const themeFromLocalStorage = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (themeFromCookie) state.darkMode = themeFromCookie === "dark";
      else if (themeFromLocalStorage) state.darkMode = themeFromLocalStorage === "dark";
      else state.darkMode = systemPrefersDark;

      updateTheme(state.darkMode);
    },
  },
});

function updateTheme(isDarkMode) {
  document.documentElement.classList.toggle("dark", isDarkMode);
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  Cookies.set("theme", isDarkMode ? "dark" : "light", { expires: 365 });
}

export const { setDarkMode, toggleDarkMode, initializeDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
