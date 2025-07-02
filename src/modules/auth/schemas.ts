import { z } from "zod/v4";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(32),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(63, "Username must not be more than 60 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letters, numbers and hyphens. It must start and end with a letter or a number"
    )
    .refine(
      (val) => !val.includes("--"),
      "Username must not contain consecutive hyphens"
    )
    .transform((val) => val.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
