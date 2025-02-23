import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  labels: [],
  status: "idle",
  error: null,
  editTask: null,
  editTaskButton: false,
  newTask: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleEditTask: (state) => {
      state.editTaskButton = !state.editTaskButton;
    },
    addEditTask: (state, action) => {
      state.editTask = action.payload;
    },
    toggleTask: (state) => {
      state.newTask = !state.newTask;
    },
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { toggleEditTask, addEditTask, toggleTask } = tasksSlice.actions;
export default tasksReducer;
