import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const getTasks = async () => {
  try {
    const response = await axios.get(`${baseUrl}/UserTask/priority`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
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
