import { z } from 'zod';

export const signUpPostRequestBodySchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(55, { message: 'First name must be at most 55 characters long' }),

  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters long' })
    .max(55, { message: 'Last name must be at most 55 characters long' }),

  email: z
    .string()
    .toLowerCase()
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Invalid email address',
    })
    .max(55, { message: 'Email must be at most 55 characters long' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(128, { message: 'Password must be at most 128 characters long' }),
});

export const loginPostRequestBodySchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Invalid email address',
    })
    .max(55, { message: 'Email must be at most 55 characters long' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(128, { message: 'Password must be at most 128 characters long' }),
});

export const shortenPostRequestBodySchema = z.object({
  userUrl: z
    .string()
    .trim()
    .url({ message: 'Invalid URL format' })
    .min(3, { message: 'URL must be at least 3 characters long' })
    .max(1024, { message: 'URL must be at most 1024 characters long' }),

  userCode: z.string().optional()
});