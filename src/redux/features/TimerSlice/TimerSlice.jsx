import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 50,
  isActive: false,
  isDragging: false,
  startAngle: 0,
  selectTaskValue: false,
  selectTask: null,
  pomodoroTask: false,
  fullScreen: false,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload;
    },
    decrementTime: (state) => {
      if (state.time > 0) {
        state.time -= 1;
      }
    },
    toggleTimer: (state) => {
      state.isActive = !state.isActive;
    },
    setIsDragging: (state, action) => {
      state.isDragging = action.payload;
    },
    setStartAngle: (state, action) => {
      state.startAngle = action.payload;
    },
    resetTimer: (state) => {
      state.time = 1500;
      state.isActive = false;
    },
    toggleSelectTask: (state, action) => {
      state.selectTaskValue = !state.selectTaskValue;
      state.selectTask = action.payload;
    },
    togglePomodoroTask: (state) => {
      state.pomodoroTask = !state.pomodoroTask;
    },
    toggleFullScreen: (state) => {
      state.fullScreen = !state.fullScreen;
    },
  },
});

export const {
  setTime,
  decrementTime,
  toggleTimer,
  setIsDragging,
  setStartAngle,
  resetTimer,
  toggleSelectTask,
  togglePomodoroTask,
  toggleFullScreen,
} = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
export default timerReducer;
