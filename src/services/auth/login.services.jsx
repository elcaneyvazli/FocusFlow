import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const authLogin = async (email, password) => {
  const response = await axios.post(
    baseUrl + "/auth/login",
    {
      email: email,
      password: password,
      isremember: true,
    },
    {
      headers: {
        withCredentials: true,
      },
    }
  );
  console.log("response", response);

  return response.data;
};
