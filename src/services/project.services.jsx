import axios from "axios";
import useSWR from "swr";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useAllProject = (id) => {
  const { data, error, mutate } = useSWR(
    `${baseUrl}/api/Project/${id}/all`,
    fetcher,
    {}
  );

  return {
    projects: data || {},
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const createProject = async (projectData, mutate) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/Project/${projectData.groupId}`,
      {
        name: projectData.projectName,
        description: projectData.projectDescription,
      },
      {
        withCredentials: true,
      }
    );

    await mutate();

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const useProjectById = (groupId, projectId) => {
  const { data, error, mutate } = useSWR(
    groupId && projectId ? `${baseUrl}/api/Project/${groupId}/${projectId}` : null,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnMount: true
    }
  );

  return {
    project: data || {},
    tasks: data?.tasks || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const createProjectTask = async (groupId, projectId, taskData, mutate) => {
  try {
    mutate((currentData) => {
      if (!currentData) return currentData;
      return {
        ...currentData,
        tasks: [...(currentData.tasks || []), taskData],
      };
    }, false);

    const response = await axios.post(
      `${baseUrl}/api/Project/${groupId}/${projectId}/tasks`,
      {
        title: taskData.title,
        description: taskData.description,
        label: taskData.label,
        dueDate: taskData.dueDate,
        status: taskData.status,
        priority: taskData.priority,
        usernamesOrEmails: taskData.usernamesOrEmails,
      },
      {
        withCredentials: true,
      }
    );

    await mutate();
    return response.data;
  } catch (error) {
    await mutate();
    throw error.response?.data || error.message;
  }
};
