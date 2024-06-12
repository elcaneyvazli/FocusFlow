import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import newTaskReducer from "./features/NewTaskSlice/newTaskSlice";
import sidebarButtonReducer from "./features/SidebarButtonSlice/SidebarButtonSlice";
import darkModeReducer from "./features/DarkModeSlice/DarkModeSlice";
import editTaskReducer from "./features/EditTaskSlice/EditTaskSlice";

export const store = configureStore({
  reducer: {
    newTaskReducer,
    sidebarButtonReducer,
    darkModeReducer,
    editTask: editTaskReducer,
  },
});

export const useAppSelector = useSelector;
