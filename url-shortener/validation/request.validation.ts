import { z } from 'zod';

export const signUpPostRequestBodySchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(55, { message: 'First name must be at most 55 characters long' }),

  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters long' })
    .max(55, { message: 'Last name must be at most 55 characters long' })
    .optional(),

  email: z
    .string()
    .toLowerCase()
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Invalid email address',
    }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(255, { message: 'Password must be at most 255 characters long' }),
});