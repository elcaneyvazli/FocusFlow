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

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
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
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.meta.arg);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.meta.arg.taskId
        );
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...action.payload };
        }
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
