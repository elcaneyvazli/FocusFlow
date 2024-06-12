import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const getUser = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/User`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
