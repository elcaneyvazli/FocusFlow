import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    modul: false,
    fullscreen: false,
    selectedTask: null,
  },
};

const selectedtask = createSlice({
  name: "selectedTask",
  initialState,
  reducers: {
    toggleTaskModul: (state, action) => {
      state.value.modul = !state.value.modul;
      state.value.fullscreen = !state.value.fullscreen;
      state.value.selectedTask = action.payload;
    },
    toggleTaskFullScreen: (state, action) => {
      state.value.fullscreen = !state.value.fullscreen;
    },
  },
});

export const { toggleTaskModul, toggleTaskFullScreen } = selectedtask.actions;
export const selectedTaskReducer = selectedtask.reducer;
export default selectedTaskReducer;
