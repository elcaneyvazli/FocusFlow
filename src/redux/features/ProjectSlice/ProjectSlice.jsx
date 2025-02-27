import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newProject: false,
  newProjectTask: false,
  editProjectTask: false,
  editProjectTaskData: null,
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
    setToggleEditProjectTask: (state) => {
      state.editProjectTask = !state.editProjectTask;
    },
    setEditProjectTaskData: (state, action) => {
      state.editProjectTaskData = action.payload;
    },
  },
});

export const projectReducer = projectSlice.reducer;
export const {
  setToggleProject,
  setToggleProjectTask,
  setToggleEditProjectTask,
  setEditProjectTaskData,
} = projectSlice.actions;
export default projectReducer;
