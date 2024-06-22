import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    modul: false,
    selectedTask: null,
  },
};

const selectedtask = createSlice({
  name: "selectedTask",
  initialState,
  reducers: {
    toggleTaskModul: (state, action) => {
      state.value.modul = !state.value.modul;
      state.value.selectedTask = action.payload;
    },
  },
});

export const { toggleTaskModul } = selectedtask.actions;
export const selectedTaskReducer = selectedtask.reducer;
export default selectedTaskReducer;
