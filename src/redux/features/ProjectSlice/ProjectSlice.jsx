import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newProject: false,
  newProjectTask: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setToggleProject: (state) => {
      state.newProject = !state.newProject;
    },
    setToggleProjectTask: (state) => {
      state.newProjectTask = !state.newProjectTask;
    },
  },
});

export const projectReducer = projectSlice.reducer;
export const { setToggleProject, setToggleProjectTask } = projectSlice.actions;
export default projectReducer;
