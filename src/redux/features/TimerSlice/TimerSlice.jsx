import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  time: 1500,
  isActive: false,
  isDragging: false,
  startAngle: 0,
};

export const timerSlice = createSlice({
  name: 'timer',
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
  },
});

export const { setTime, decrementTime, toggleTimer, setIsDragging, setStartAngle, resetTimer } = timerSlice.actions;

export default timerSlice.reducer;

