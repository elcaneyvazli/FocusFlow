import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

const toastMessage = createSlice({
  name: "toastMessage",
  initialState,
  reducers: {
    addToast: (state, action) => {
      // Add unique ID when creating toast
      const newToast = {
        ...action.payload,
        id: Date.now().toString() // Add unique timestamp ID
      };
      state.toasts.push(newToast);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
  },
});

export const { addToast, removeToast } = toastMessage.actions;
export const toastMessageReducer = toastMessage.reducer;
export default toastMessageReducer;
