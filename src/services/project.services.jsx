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
      const newTask = {
        id: Date.now(), 
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

    const response = await axios.post(
      `${baseUrl}/api/Project/${groupId}/${projectId}/tasks`,
      taskData,
      { withCredentials: true }
    );

    mutate();
    return response.data;
  } catch (error) {
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

    await mutate();
    return response.data;
  } catch (error) {
    await mutate();
    throw error.response?.data || error.message;
  }
};

export const updateProjectTask = async (groupId, projectId, taskId, updatedData) => {
  try {
    if (!groupId || !projectId || !taskId) {
      throw new Error('Missing required parameters');
    }

    // Format the request data according to the API requirements
    const requestData = {
      taskId: parseInt(taskId), // Ensure taskId is a number
      title: updatedData.title,
      description: updatedData.description,
      label: updatedData.label || "",
      dueDate: new Date(updatedData.dueDate).toISOString(), // Ensure proper date format
      priority: parseInt(updatedData.priority), // Ensure priority is a number
      status: parseInt(updatedData.status), // Ensure status is a number
      usernamesOrEmails: Array.isArray(updatedData.usernamesOrEmails) 
        ? updatedData.usernamesOrEmails 
        : []
    };

    console.log('Sending update request with data:', requestData); // Debug log

    const response = await axios.put(
      `${baseUrl}/api/Project/${groupId}/${projectId}/tasks`,
      requestData,
      { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Update task error details:', error.response?.data);
    throw error.response?.data || error.message;
  }
};

export const updateProjectTaskStatus = async (groupId, projectId, taskId, status) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/api/Project/${groupId}/${projectId}/${taskId}/status?status=${status}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Update status error:', error);
    throw error.response?.data || error.message;
  }
};
