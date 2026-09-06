import { z } from "zod";

// 1.Define a schema for user registration
// 2. Use the schema to validate incoming requests in the controller for that we need validation middleware
export const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Invalid email address")
    .min(3, "email must be at least 3 characters long")
    .max(20, "email must be at most 20 characters long"),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, "Phone must be at least 10 characters long")
    .max(20, "Phone must be at most 20 characters long"),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, "Password must be at least 7 characters long")
    .max(1024, "Password must be at most 1024 characters long"),
});
