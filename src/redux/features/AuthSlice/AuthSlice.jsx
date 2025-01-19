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
      return rejectWithValue(
        error.response?.data || {
          title: "Error",
          desc: error.message,
        }
      );
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
      return rejectWithValue(
        error.response?.data || {
          title: "Error",
          desc: error.message,
        }
      );
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

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/User`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          title: "Error fetching user",
          desc: error.message,
        }
      );
    }
  }
);

export const googleAuth = createAsyncThunk(
  "auth/google",
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/Auth/google?idToken=${code}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Google auth error:", error);
      return rejectWithValue(
        error.response?.data || {
          title: "Error",
          desc: error.message,
        }
      );
    }
  }
);

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(authRegister.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(authLogout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.error = null;
      })
      .addCase(authLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(googleAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const authReducer = authSlice.reducer;
export default authReducer;
