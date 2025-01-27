import axios from "axios";
import useSWR from "swr";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useAllProject = (id) => {
  const { data, error, mutate } = useSWR(
    `${baseUrl}/api/Project/${id}/all`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  return {
    projects: data || {},
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const createProject = async (groupData, mutate) => {
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
