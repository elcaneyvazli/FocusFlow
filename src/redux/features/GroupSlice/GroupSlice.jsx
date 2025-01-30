import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

const initialState = {
  newGroup: false,
  newProject: false,
  groupDetail: false,
  newMember: false,
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
  },
});

export const groupReducer = groupSlice.reducer;
export const { setToggleGroup, setToggleProject, setToggleGroupDetail,setToggleNewMember } =
  groupSlice.actions;
export default groupReducer;
