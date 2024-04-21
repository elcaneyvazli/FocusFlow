import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    sidebarButton: false,
  },
};
export const sidebarButton = createSlice({
  name: "sidebarButton",
  initialState,
  reducers: {
    toggleSidebar : (state) => {
      state.value.sidebarButton = !state.value.sidebarButton;
    },
  },
});

export const { toggleSidebar  } = sidebarButton.actions;
export const sidebarButtonReducer = sidebarButton.reducer;

export default sidebarButtonReducer;