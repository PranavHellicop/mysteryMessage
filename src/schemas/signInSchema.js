import {z} from "zod"

const usernameSchema = z.string().min(3).regex(/^[a-zA-Z0-9_]+$/, "Username must be alphanumeric");

// Define an email schema
const emailSchema = z.string().email("Invalid email address");

// Union schema for username or email
const usernameOrEmailSchema = z.union([usernameSchema, emailSchema]);

export const signInSchema = z.object({
    identifier:usernameOrEmailSchema,
    password:z.string()
})