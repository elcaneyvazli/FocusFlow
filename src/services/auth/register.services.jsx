import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const authRegister = async (email, password, userName) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/auth/signup`,
      {
        email: email,
        password: password,
        userName: userName,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error, email, password, userName);
    throw error;
  }
};
