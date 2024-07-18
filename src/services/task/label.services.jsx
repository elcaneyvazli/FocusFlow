import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const getLabel = async () => {
  try {
    const response = await axios.get(`${baseUrl}/UserTask/labels`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
