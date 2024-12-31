import { add } from "@dnd-kit/utilities";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import useSWR from "swr";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useGroups = () => {
  const { data, error, mutate } = useSWR(`${baseUrl}/Group`, fetcher, {
    refreshInterval: 1000,
    revalidateOnFocus: true,
  });

  return {
    groups: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useGroupById = (id) => {
  const { data, error, mutate } = useSWR(
    id ? `${baseUrl}/Group/${id}` : null,
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
    }
  );
  return {
    group: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useGroupMembers = (id) => {
  const { data, error, mutate } = useSWR(
    id ? `${baseUrl}/Group/${id}/members` : null,
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
    }
  );
  return {
    members: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useGroupProject = (id) => {
  const { data, error, mutate } = useSWR(
    id ? `${baseUrl}/api/Project/${id}/all` : null,
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
    }
  );

  return {
    groupProject: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (groupData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/Group`, groupData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addGroupMember = createAsyncThunk(
  "group/addGroupMember",
  async (groupData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/Group/${groupData.id}/add-user?usernameOrEmail=${groupData.usernameOrEmail}`,
        {},
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

export const addGroupProject = createAsyncThunk(
  "group/addGroupProject",
  async ({ projectData, id }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/project/${id}`,
        {
          name: projectData.name,
          description: projectData.description,
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
  addGroupModal: false,
  addGroupMemberModal: false,
  addProjectModal: false,
  status: "idle",
  error: null,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    toggleAddGroupModal: (state) => {
      state.addGroupModal = !state.addGroupModal;
    },
    toggleAddGroupMemberModal: (state) => {
      state.addGroupMemberModal = !state.addGroupMemberModal;
    },
    toggleAddProjectModal: (state) => {
      state.addProjectModal = !state.addProjectModal;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createGroup.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addGroupMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addGroupMember.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addGroupMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addGroupProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addGroupProject.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addGroupProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const groupReducer = groupSlice.reducer;
export const {
  toggleAddGroupModal,
  toggleAddGroupMemberModal,
  toggleAddProjectModal,
} = groupSlice.actions;
export default groupReducer;
