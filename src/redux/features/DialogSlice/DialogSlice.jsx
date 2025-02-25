import { createSlice } from "@reduxjs/toolkit";
import { deleteTask } from "@/services/task.services";
import { deleteProjectTask } from "@/services/project.services"; // Add this import
import { addToast } from "../ToastSlice/ToastSlice";

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

export const handleDialogConfirm = (dialogType, data, dispatch) => {
  if (!dialogType) return;

  return async () => {
    try {
      switch (dialogType) {
        case "deleteTask":
          await deleteTask(data.taskId);
          if (data.onMutate) data.onMutate();
          dispatch(
            addToast({
              title: "Success",
              message: "Task deleted successfully",
              variant: "success",
            })
          );
          break;

        case "deleteProjectTask":
          await deleteProjectTask(data.groupId, data.projectId, data.taskId, data.onMutate);
          dispatch(
            addToast({
              title: "Success",
              message: "Project task deleted successfully",
              variant: "success",
            })
          );
          break;

        case "logout":
          // ...existing logout code...
          break;
      }
    } catch (error) {
      dispatch(
        addToast({
          title: "Error",
          message: `Failed to ${
            dialogType === "deleteTask" 
              ? "delete task" 
              : dialogType === "deleteProjectTask"
              ? "delete project task"
              : "logout"
          }`,
          variant: "error",
        })
      );
    }

    dispatch(closeDialog());
  };
};

export const { openDialog, closeDialog } = dialogSlice.actions;
export const dialogReducer = dialogSlice.reducer;
export default dialogReducer;
