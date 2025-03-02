import axios from "axios";
import useSWR from "swr";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useGroup = () => {
  const { data, error, mutate } = useSWR(`${baseUrl}/Group`, fetcher, {});

  return {
    groups: data || {},
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const createGroup = async (groupData, mutate) => {
  try {
    mutate((currentData) => {
      const newGroup = {
        ...currentData,
        groups: [...(currentData?.groups || []), groupData],
      };
      return newGroup;
    }, false);

    const response = await axios.post(
      `${baseUrl}/Group`,
      {
        name: groupData.groupName,
        description: groupData.groupDescription,
      },
      {
        withCredentials: true,
      }
    );

    mutate();
    return response.data;
  } catch (error) {
    mutate();
    throw error.response?.data || error.message;
  }
};

export const useGroupById = (id) => {
  const { data, error, mutate } = useSWR(`${baseUrl}/Group/${id}`, fetcher, {});

  return {
    group: data || {},
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
export const useGroupMember = (id) => {
  const { data, error, mutate } = useSWR(
    `${baseUrl}/Group/${id}/members`,
    fetcher,
    {}
  );

  return {
    member: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const addGroupMember = async (id, memberName, mutate) => {
  try {
    mutate((currentData) => {
      return [...(currentData || []), { name: memberName }];
    }, false);

    const response = await axios.post(
      `${baseUrl}/Group/${id}/add-user?usernameOrEmail=${encodeURIComponent(
        memberName
      )}`,
      {},
      {
        withCredentials: true,
      }
    );

    mutate();
    return response.data;
  } catch (error) {
    mutate();
    throw error.response?.data || error.message;
  }
};

export const removeGroupMember = async (groupId, username, mutate) => {
  try {
    const response = await axios.post(
      `${baseUrl}/Group/${groupId}/remove-user?usernameOrEmail=${encodeURIComponent(
        username
      )}`,
      {},
      {
        withCredentials: true,
      }
    );
    mutate();
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Member not found or already removed");
    }
    throw error.response?.data || error.message;
  }
};

export const deleteGroup = async (groupId) => {
  try {
    const response = await axios.delete(`${baseUrl}/Group/${groupId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateGroup = async (groupId, data) => {
  try {
    const response = await axios.put(
      `${baseUrl}/Group/${groupId}`,
      {
        name: data.name,
        description: data.description,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const useUserRole = (groupId) => {
  const { data, error, mutate } = useSWR(
    `${baseUrl}/Group/${groupId}/user-role`,
    fetcher,
    {}
  );

  return {
    role: data?.role || "",
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const changeUserRole = async (groupId, username, roleId, mutate) => {
  try {
    const response = await axios.post(
      `${baseUrl}/Group/${groupId}/change-role?usernameOrEmail=${encodeURIComponent(
        username
      )}&roleId=${roleId}`,
      {},
      {
        withCredentials: true,
      }
    );
    mutate();
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
