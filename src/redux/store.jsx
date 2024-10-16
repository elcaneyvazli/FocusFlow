import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import sidebarButtonReducer from "./features/SidebarButtonSlice/SidebarButtonSlice";
import darkModeReducer from "./features/DarkModeSlice/DarkModeSlice";
import pomodoroReducer from "./features/PomodoroSlice/PomodoroSlice";
import toastMessageReducer from "./features/ToastSlice/ToastSlice";
import askaiReducer from "./features/AiSlice/AiSlice";
import tasksReducer from "./features/TaskSlice/TaskSlice";
import userReducer from "./features/UserSlice/UserSlice";
import timerReducer from "./features/TimerSlice/TimerSlice";
import groupReducer from "./features/GroupSlice/GroupSlice";

export const store = configureStore({
  reducer: {
    sidebarButton: sidebarButtonReducer,
    darkMode: darkModeReducer,
    pomodoro: pomodoroReducer,
    askai: askaiReducer,
    toastMessageReducer,
    tasks: tasksReducer,
    user: userReducer,
    timer: timerReducer,
    group: groupReducer,
  },
});

export const useAppSelector = useSelector;
