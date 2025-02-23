import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newProject: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setToggleProject: (state) => {
      state.newProject = !state.newProject;
    },
  },
});

export const projectReducer = projectSlice.reducer;
export const { setToggleProject } = projectSlice.actions;
export default projectReducer;
