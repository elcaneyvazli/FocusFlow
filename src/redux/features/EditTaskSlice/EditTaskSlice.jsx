import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editTask: false,
};

export const editTaskSlice = createSlice({
  name: "editTask",
  initialState,
  reducers: {
    toggleEditTask: (state) => {
      state.editTask = !state.editTask;
    },
  },
});

export const { toggleEditTask } = editTaskSlice.actions;
export default editTaskSlice.reducer;
