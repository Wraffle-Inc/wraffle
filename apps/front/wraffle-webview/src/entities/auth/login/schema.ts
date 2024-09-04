import {z} from 'zod';
import {getDefaults} from '@/shared/util';

const passwordSchema = z
  .string()
  .regex(/^(?=.*[A-Z])/, 'One uppercase letter.')
  .regex(/^(?=.*[a-z])/, 'One lowercase letter.')
  .regex(/^(?=.*\d)/, 'One digit.')
  .regex(/^(?=.*[\W_])/, 'One special character.')
  .min(8, {message: 'At least 8 characters.'})
  .default('');

const emailSchema = z
  .string()
  .min(1, {message: 'Email required.'})
  .email({message: 'Invalid email.'})
  .default('');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginPayload = z.infer<typeof loginSchema>;

export const loginDefaultValues = getDefaults(loginSchema);
