import axios from "axios";
import useSWR from "swr";
import Cookies from "js-cookie";

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
    // Optimistic update with proper task structure
    mutate((currentData) => {
      if (!currentData) return currentData;
      
      const newTask = {
        id: Date.now(), // Temporary ID
        ...taskData,
        isCompleted: false
      };

      return {
        ...currentData,
        taskInformation: {
          ...currentData.taskInformation,
          tasks: currentData.taskInformation.tasks.map(column => {
            if (column.id === taskData.status) {
              return {
                ...column,
                items: [...column.items, newTask]
              };
            }
            return column;
          })
        }
      };
    }, false);

    // Make the actual API call
    const response = await axios.post(
      `${baseUrl}/api/Project/${groupId}/${projectId}/tasks`,
      taskData,
      { withCredentials: true }
    );

    // No need to await mutate() here since we already have optimistic update
    mutate();
    return response.data;
  } catch (error) {
    // Revalidate on error to restore correct state
    await mutate();
    throw error.response?.data || error.message;
  }
};

export const deleteProjectTask = async (groupId, projectId, taskId, mutate) => {
  if (!groupId || !projectId || !taskId) {
    throw new Error('Missing required parameters');
  }

  try {
    // Optimistic delete
    mutate((currentData) => {
      if (!currentData) return currentData;
      
      return {
        ...currentData,
        taskInformation: {
          ...currentData.taskInformation,
          tasks: currentData.taskInformation.tasks.map(column => ({
            ...column,
            items: column.items.filter(task => task.id !== taskId)
          }))
        }
      };
    }, false);

    const response = await axios.delete(
      `${baseUrl}/api/Project/${groupId}/${projectId}/tasks/${taskId}`,
      { withCredentials: true }
    );

    // Final revalidation
    await mutate();
    return response.data;
  } catch (error) {
    // Revalidate on error
    await mutate();
    throw error.response?.data || error.message;
  }
};

// Also add updateProjectTask similar to updateTask
export const updateProjectTask = async (groupId, projectId, taskId, updatedData) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/Project/${groupId}/${projectId}/tasks/${taskId}`,
      updatedData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Add updateProjectTaskStatus similar to updateTaskStatus
export const updateProjectTaskStatus = async (groupId, projectId, taskId, status) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/api/Project/${groupId}/${projectId}/tasks/${taskId}/status`,
      { status },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
