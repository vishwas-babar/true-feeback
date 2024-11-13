import { z } from 'zod';
import { signupSchema } from './signupschema';

export const signinSchema = z.object({
  email: signupSchema.shape.email,
  password: signupSchema.shape.password
});