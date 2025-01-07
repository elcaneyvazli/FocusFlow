import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const authLogin = createAsyncThunk(
  "auth/login",
  async ({ emailOrUsername, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/Auth/signin`,
        {
          emailOrUsername: emailOrUsername,
          password: password,
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

export const authRegister = createAsyncThunk(
  "auth/register",
  async ({ email, password, userName }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/Auth/signup`,
        {
          email: email,
          password: password,
          userName: userName,
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

export const authLogout = createAsyncThunk(
  "Auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.head(`${baseUrl}/Auth`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  auth: [],
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.auth = action.payload;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(authRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.auth = action.payload;
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(authLogout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authLogout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.auth = action.payload;
      })
      .addCase(authLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
export default authReducer;
