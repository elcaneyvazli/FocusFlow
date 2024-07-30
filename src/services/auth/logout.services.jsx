import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const authLogout = async () => {
  try {
    const response = await axios.head(`${baseUrl}/api/auth`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
