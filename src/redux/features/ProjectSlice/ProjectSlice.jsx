import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newProject: false,
  newProjectTask: false,
  editProjectTask: false,
  editProjectTaskData: null,
  addMember: false,
  editProject: false,
  editProjectData: null,
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
    setToggleAddMember: (state) => {
      state.addMember = !state.addMember;
    },
    setToggleEditProject: (state) => {
      state.editProject = !state.editProject;
    },
    setEditProjectData: (state, action) => {
      state.editProjectData = action;
    },
  },
});

export const projectReducer = projectSlice.reducer;
export const {
  setToggleProject,
  setToggleProjectTask,
  setToggleEditProjectTask,
  setEditProjectTaskData,
  setToggleAddMember,
  setToggleEditProject,
  setEditProjectData,
} = projectSlice.actions;
export default projectReducer;
