import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const getGroup = createAsyncThunk(
  "group/getGroup",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/Group`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  group: [],
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroup: (state, action) => {
      state.group = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.group = action.payload;
      })
      .addCase(getGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const groupReducer = groupSlice.reducer;
export const { setGroup } = groupSlice.actions;
export default groupReducer;
