import * as yup from "yup";

export const LoginSchema = yup.object({
  emailOrUsername: yup.string().required("Email or Username is required"),
  password: yup.string().required("Password is required"),
});

export const RegisterSchema = yup.object({
  email: yup
    .string()
    .required("Email or Username is required")
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"),
  password: yup.string().required("Password is required"),
  userName: yup
    .string()
    .required("Username is required")
    .min(3, "Username is too short min 3 characters")
    .max(30, "Username is too long max 30 characters"),
});
