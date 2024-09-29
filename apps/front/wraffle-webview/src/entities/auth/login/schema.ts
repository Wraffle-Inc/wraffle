import {z} from 'zod';
import {getDefaults} from '@/shared/util';

const passwordSchema = z
  .string()
  .min(1, {message: '비밀번호를 입력해 주세요.'})
  .default('');

const emailSchema = z
  .string()
  .min(1, {message: '이메일을 입력해 주세요.'})
  .email({message: '유효하지 않은 이메일 형식입니다.'})
  .default('');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginPayload = z.infer<typeof loginSchema>;

export const loginDefaultValues = getDefaults(loginSchema);
