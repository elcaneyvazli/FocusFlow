import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const getTasks = async () => {
  try {
    const response = await axios.get(`${baseUrl}/UserTask/priority`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    const authError = error.response?.status;
    if (authError === 401) {
      Cookies?.remove("acc");
      window.location.href = "/login";
    }
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
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
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${baseUrl}/UserTask/${taskId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const updateTask = async (taskId, updatedData) => {
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
    console.error("Error updating task:", error);
    throw error;
  }
};