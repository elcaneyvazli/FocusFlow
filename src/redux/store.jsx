import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import newTaskReducer from "./features/NewTaskSlice/newTaskSlice";
import sidebarButtonReducer from "./features/SidebarButtonSlice/SidebarButtonSlice";
import darkModeReducer from "./features/DarkModeSlice/DarkModeSlice";
import pomodoroReducer from "./features/PomodoroSlice/PomodoroSlice";
import selectedTaskReducer from "./features/SelectedTaskSlice/SelectedTaskSlice";
import toastMessageReducer from "./features/ToastSlice/ToastSlice";
import askaiReducer from "./features/AiSlice/AiSlice";
import tasksReducer from "./features/TaskSlice/TaskSlice";
import userReducer from "./features/UserSlice/UserSlice";

export const store = configureStore({
  reducer: {
    newTaskReducer,
    sidebarButtonReducer,
    darkModeReducer,
    pomodoro: pomodoroReducer,
    askai: askaiReducer,
    selectedTaskReducer,
    toastMessageReducer,
    tasks: tasksReducer,
    user: userReducer,
  },
});

export const useAppSelector = useSelector;
