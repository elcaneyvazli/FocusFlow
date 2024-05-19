import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const authRegister = async (email ,fullname, password) => {
  const response = await axios.post(baseUrl + "/auth/register", {
    email: email,
    password: password,
    fullname: fullname,
  });
  return response.data;
};
