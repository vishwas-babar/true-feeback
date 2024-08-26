import { z } from 'zod';

export const signinSchema = z.object({
  email: z.string().email('invalid email'),
  password: z.string().min(8, 'password must be at least 8 characters')
});