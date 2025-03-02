import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

const initialState = {
  newGroup: false,
  newProject: false,
  groupDetail: false,
  newMember: false,
  groupSettings: false,
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
    setToggleGroupDetail: (state) => {
      state.groupDetail = !state.groupDetail;
    },
    setToggleNewMember: (state) => {
      state.newMember = !state.newMember;
    },
    setToggleGroupSettings: (state) => {
      state.groupSettings = !state.groupSettings;
    },
  },
});

export const groupReducer = groupSlice.reducer;
export const {
  setToggleGroup,
  setToggleProject,
  setToggleGroupDetail,
  setToggleNewMember,
  setToggleGroupSettings,
} = groupSlice.actions;
export default groupReducer;
