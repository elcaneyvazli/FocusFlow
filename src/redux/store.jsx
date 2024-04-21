import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import newTaskReducer from "./features/NewTaskSlice/newTaskSlice";
import sidebarButtonReducer from "./features/SidebarButtonSlice/SidebarButtonSlice";

export const store = configureStore({
  reducer: {
    newTaskReducer,
    sidebarButtonReducer,
  },
});

export const useAppSelector = useSelector;
