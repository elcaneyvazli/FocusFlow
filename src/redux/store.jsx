import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import newTaskReducer from "./features/NewTaskSlice/newTaskSlice";
import sidebarButtonReducer from "./features/SidebarButtonSlice/SidebarButtonSlice";
import darkModeReducer from "./features/DarkModeSlice/DarkModeSlice";
import editTaskReducer from "./features/EditTaskSlice/EditTaskSlice";
import pomodoroReducer from "./features/PomodoroSlice/PomodoroSlice";

export const store = configureStore({
  reducer: {
    newTaskReducer,
    sidebarButtonReducer,
    darkModeReducer,
    editTask: editTaskReducer,
    pomodoro: pomodoroReducer,
  },
});

export const useAppSelector = useSelector;
