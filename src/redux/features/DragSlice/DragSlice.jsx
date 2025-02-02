import { createSlice } from "@reduxjs/toolkit";

const dragSlice = createSlice({
  name: "drag",
  initialState: {
    isDragging: false,
  },
  reducers: {
    setIsDragging: (state, action) => {
      state.isDragging = action.payload;
    },
  },
});

export const dragReducer = dragSlice.reducer;
export const { setIsDragging } = dragSlice.actions;
export default dragReducer;
