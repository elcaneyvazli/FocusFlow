import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const authRegister = async (fullname, email, password) => {
  const response = await axios.post(baseUrl + "/auth/register", {
    withCredentials: true,
    fullname: fullname,
    email: email,
    password: password,
  });

  return response.data;
};
