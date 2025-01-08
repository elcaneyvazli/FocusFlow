import * as yup from "yup";

export const LoginSchema = yup.object({
  emailOrUsername: yup.string().required("Email or Username is required"),
  password: yup.string().required("Password is required"),
});

export const RegisterSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required")
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"),
  userName: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username is too long max 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const TaskSchema = yup.object({
  taskTitle: yup
    .string()
    .required("Title is required")
    .min(3, "Title is too short, minimum 3 characters")
    .max(100, "Title is too long, maximum 100 characters"),
  taskDescription: yup.string().required("Description is required"),
  taskLabel: yup
    .string()
    .required("Label is required")
    .min(3, "Label is too short, minimum 3 characters")
    .max(30, "Label is too long, maximum 30 characters"),
});

export const GroupSchema = yup.object({
  groupName: yup
    .string()
    .required("Title is required")
    .min(3, "Title is too short, minimum 3 characters")
    .max(100, "Title is too long, maximum 100 characters"),
  groupDescription: yup
    .string()
    .required("Label is required")
    .min(3, "Label is too short, minimum 3 characters")
    .max(30, "Label is too long, maximum 30 characters"),
});
export const ProjectSchema = yup.object({
  projectName: yup
    .string()
    .required("Title is required")
    .min(3, "Title is too short, minimum 3 characters")
    .max(100, "Title is too long, maximum 100 characters"),
  projectDescription: yup
    .string()
    .required("Label is required")
    .min(3, "Label is too short, minimum 3 characters")
    .max(30, "Label is too long, maximum 30 characters"),
});
export const GroupMemberSchema = yup.object({
  memberNameorUsername: yup
    .string()
    .required("Title is required")
    .max(100, "Title is too long, maximum 100 characters"),
});
