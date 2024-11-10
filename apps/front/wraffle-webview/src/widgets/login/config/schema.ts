import {z} from 'zod';
import {emailSchema, passwordSchema} from '@/entities/auth/schema';
import {getDefaults} from '@/shared/util';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginPayload = z.infer<typeof loginSchema>;

export const loginDefaultValues = getDefaults(loginSchema);
