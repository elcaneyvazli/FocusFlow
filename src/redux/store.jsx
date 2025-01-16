import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import darkModeReducer from "./features/DarkModeSlice/DarkModeSlice";
import toastMessageReducer from "./features/ToastSlice/ToastSlice";
import authReducer from "./features/AuthSlice/AuthSlice";
import taskReducer from "./features/TaskSlice/TaskSlice";
import dialogReducer from "./features/DialogSlice/DialogSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    toast: toastMessageReducer,
    auth: authReducer,
    task: taskReducer,
    dialog: dialogReducer,
  },
});

export const useAppSelector = useSelector;
