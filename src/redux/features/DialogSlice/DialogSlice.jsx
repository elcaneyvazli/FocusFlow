import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  title: "",
  message: "",
  variant: "default",
  dialogType: null,
  data: null,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.variant = action.payload.variant || "default";
      state.dialogType = action.payload.dialogType;
      state.data = action.payload.data;
    },
    closeDialog: (state) => {
      return initialState;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export const dialogReducer = dialogSlice.reducer;
export default dialogReducer;
