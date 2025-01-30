import axios from "axios";
import useSWR from "swr";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useGroup = () => {
  const { data, error, mutate } = useSWR(`${baseUrl}/Group`, fetcher, {
    revalidateOnFocus: true,
  });

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
  const { data, error, mutate } = useSWR(`${baseUrl}/Group/${id}`, fetcher, {
    revalidateOnFocus: true,
  });

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
    {
      revalidateOnFocus: true,
    }
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
      `${baseUrl}/Group/${id}/add-user?usernameOrEmail=${encodeURIComponent(memberName)}`,
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
