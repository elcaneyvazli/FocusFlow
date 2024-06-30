import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const getSubTasks = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/TaskStep?taskId=${id}`, {
      withCredentials: true,
    });
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    const authError = error.response?.status;
    throw error;
  }
};

export const createSubTask = async (subTaskData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/TaskStep`,
      {
        ...subTaskData,
        isCompleted: false,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating subTask:", error);
    throw error;
  }
};

export const deleteSubTask = async (subTaskId) => {
  try {
    const response = await axios.delete(`${baseUrl}/TaskStep/${subTaskId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
