import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    newTask: false,
  },
};
export const newTask = createSlice({
  name: "newtask",
  initialState,
  reducers: {
    toggleTask : (state) => {
      state.value.newTask = !state.value.newTask;
    },
  },
});

export const { toggleTask  } = newTask.actions;
export const newTaskReducer = newTask.reducer;
export default newTaskReducer;