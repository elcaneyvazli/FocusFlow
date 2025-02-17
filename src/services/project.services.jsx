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
    `${baseUrl}/api/Project/${groupId}/${projectId}`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  return {
    project: data || {},
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const createProjectTask = async (
  taskData,
  mutate,
  groupId,
  projectId
) => {
  if (!groupId || !projectId) {
    throw new Error("Group ID and Project ID are required");
  }

  try {
    const response = await axios.post(
      `${baseUrl}/api/Project/${groupId}/${projectId}/tasks`,
      {
        ...taskData,
        usernamesOrEmails: Array.isArray(taskData.usernamesOrEmails) 
          ? taskData.usernamesOrEmails 
          : [],
        priority: Number(taskData.priority),
        status: Number(taskData.status)
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (typeof mutate === "function") {
      await mutate();
    }

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.title || "Failed to create task");
  }
};
