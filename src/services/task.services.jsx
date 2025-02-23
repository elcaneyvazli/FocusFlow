import axios from "axios";
import useSWR from "swr";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useTasks = () => {
  const { data, error, mutate } = useSWR(
    `${baseUrl}/UserTask/status`,
    fetcher,
    {
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
    columns: data?.tasks || [],
    tasks: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useLabels = () => {
  const { data, error, mutate } = useSWR(
    `${baseUrl}/UserTask/labels`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  return {
    labels: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const createTask = async (taskData, mutate) => {
  try {
    mutate((currentData) => {
      const newTasks = {
        ...currentData,
        tasks: [...(currentData?.tasks || []), taskData],
      };
      return newTasks;
    }, false);

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

    mutate();
    return response.data;
  } catch (error) {
    mutate();
    throw error.response?.data || error.message;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${baseUrl}/UserTask/${taskId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateTask = async ({ taskId, updatedData }) => {
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
    throw error.response?.data || error.message;
  }
};

export const updateTaskPriority = async ({ taskId, priority }) => {
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
    throw error.response?.data || error.message;
  }
};

export const updateTaskStatus = async ({ taskId, status }) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/UserTask/status`,
      {
        id: taskId,
        status: status,
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
