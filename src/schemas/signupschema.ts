import { z } from "zod";

const userNameValidation = z
    .string()
    .max(50, "username must be less than 50 characters")
    .min(3, "username must be more than 3 characters")
    .regex(/^[a-zA-Z0-9_]*$/, "username must only contain letters, numbers, and underscores");


export const singupSchema = z.object({
    username: userNameValidation,
    email: z.string().email("invalid email"),
    password: z.string().min(8, "password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "password must be at least 8 characters"),
})
