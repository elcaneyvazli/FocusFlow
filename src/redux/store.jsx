import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import darkModeReducer from "./features/DarkModeSlice/DarkModeSlice";
import toastMessageReducer from "./features/ToastSlice/ToastSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    toast: toastMessageReducer,
  },
});

export const useAppSelector = useSelector;
