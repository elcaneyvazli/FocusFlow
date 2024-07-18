import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import newTaskReducer from "./features/NewTaskSlice/newTaskSlice";
import sidebarButtonReducer from "./features/SidebarButtonSlice/SidebarButtonSlice";
import darkModeReducer from "./features/DarkModeSlice/DarkModeSlice";
import editTaskReducer from "./features/EditTaskSlice/EditTaskSlice";
import pomodoroReducer from "./features/PomodoroSlice/PomodoroSlice";
import selectedTaskReducer from "./features/TaskSlice/TaskSlice";
import toastMessageReducer from "./features/ToastSlice/ToastSlice";
import askaiReducer from "./features/AiSlice/AiSlice";

export const store = configureStore({
  reducer: {
    newTaskReducer,
    sidebarButtonReducer,
    darkModeReducer,
    editTask: editTaskReducer,
    pomodoro: pomodoroReducer,
    askai: askaiReducer,
    selectedTaskReducer,
    toastMessageReducer,
  },
});

export const useAppSelector = useSelector;
