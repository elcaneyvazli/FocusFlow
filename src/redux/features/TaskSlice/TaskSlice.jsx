import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import useSWR from "swr";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useTasks = () => {
  const { data, error, mutate } = useSWR(
    `${baseUrl}/UserTask/priority`,
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
      onError: (error) => {
        if (error.response?.status === 401) {
          Cookies.remove("acc");
          window.location.href = "/login";
        }
      },
    }
  );

  return {
    tasks: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const getTasks = createAsyncThunk(
  "user/getTask",
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
      return rejectWithValue(
        error.response?.data || {
          title: "Error fetching user",
          desc: error.message,
        }
      );
    }
  }
);

const initialState = {
  task: [],
  status: "idle",
  error: null,
};

const taskSlice = createSlice({
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
        state.task = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const taskReducer = taskSlice.reducer;
export default taskReducer;
