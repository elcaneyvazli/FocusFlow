import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

const initialState = {
  newGroup: false,
  newProject: false,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setToggleGroup: (state) => {
      state.newGroup = !state.newGroup;
    },
    setToggleProject: (state) => {
      state.newProject = !state.newProject;
    },
  },
});

export const groupReducer = groupSlice.reducer;
export const { setToggleGroup, setToggleProject } = groupSlice.actions;
export default groupReducer;
