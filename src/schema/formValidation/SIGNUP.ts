import * as yup from "yup";

export const SIGNUP_SCHEMA = yup.object({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  termsAccepted: yup.boolean().required("You must accept the terms and conditions").oneOf([true], "You must accept the terms and conditions"),
}).required();