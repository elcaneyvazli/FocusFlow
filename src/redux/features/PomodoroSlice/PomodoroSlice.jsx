import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pomodoro: false,
};

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState,
  reducers: {
    toggleTask: (state) => {
      state.pomodoro = !state.pomodoro;
    },
  },
});

export const { toggleTask } = pomodoroSlice.actions;
export default pomodoroSlice.reducer;
