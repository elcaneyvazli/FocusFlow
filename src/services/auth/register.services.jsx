import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const authRegister = async (email, password, userName) => {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/signup`,
      {
        email: email,
        password: password,
        userName: userName,
        confirmPassword: password,
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
