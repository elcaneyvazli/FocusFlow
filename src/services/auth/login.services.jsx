import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const authLogin = async (emailOrUsername, password) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/auth/signin`,
      {
        emailOrUsername: emailOrUsername,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
