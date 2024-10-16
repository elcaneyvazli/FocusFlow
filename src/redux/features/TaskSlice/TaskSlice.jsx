import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/UserTask/priority`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const authError = error.response?.status;
      if (authError === 401) {
        Cookies?.remove("acc");
        window.location.href = "/login";
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getLabel = createAsyncThunk(
  "tasks/getLabel",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/UserTask/labels`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/UserTask`,
        {
          ...taskData,
          isCompleted: false,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/UserTask/${taskId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/UserTask`,
        {
          id: taskId,
          ...updatedData,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateTaskPriority = createAsyncThunk(
  "tasks/updateTaskPriority",
  async ({ taskId, priority }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/UserTask`,
        {
          id: taskId,
          priority: priority,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  tasks: [],
  labels: [],
  status: "idle",
  error: null,
  editTask: null,
  editTaskButton: false,
  newTask: false,
  selectTaskValue: false,
  selectTask: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleEditTask: (state) => {
      state.editTaskButton = !state.editTaskButton;
    },
    addEditTask: (state, action) => {
      state.editTask = action.payload;
    },
    toggleTask: (state) => {
      state.newTask = !state.newTask;
    },
    toggleSelectTask: (state, action) => {
      state.selectTaskValue = !state.selectTaskValue;
      state.selectTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getLabel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLabel.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.labels = action.payload;
      })
      .addCase(getLabel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateTaskPriority.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { toggleEditTask, addEditTask, toggleTask, toggleSelectTask } =
  tasksSlice.actions;
export default tasksReducer;
