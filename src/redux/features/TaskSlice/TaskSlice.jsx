import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  labels: [],
  status: "idle",
  error: null,
  editTask: null,
  editTaskButton: false,
  newTask: false,
  selectTaskValue: false,
  selectTask: null,
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
    toggleSelectTask: (state, action) => {
      state.selectTaskValue = !state.selectTaskValue;
      state.selectTask = action.payload;
    },
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { toggleEditTask, addEditTask, toggleTask, toggleSelectTask } =
  tasksSlice.actions;
export default tasksReducer;
