import {z} from 'zod';
import {getDefaults} from '@/shared/util';

const passwordSchema = z
  .string()
  .min(1, {message: '비밀번호를 입력해 주세요.'})
  .refine(
    value =>
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~@#$!%?&])[a-zA-Z\d~@#$!%*?&]{8,}$/.test(
        value,
      ),
    {
      message:
        '비밀번호는 영문, 숫자, 특수문자를 조합하여 8자 이상이어야 합니다.',
    },
  )
  .default('');

const emailSchema = z
  .string()
  .min(1, {message: '이메일을 입력해 주세요.'})
  .email({message: '유효하지 않은 이메일 형식입니다.'})
  .refine(
    value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(value),
    {
      message: '유효하지 않은 이메일 형식입니다.',
    },
  )
  .default('');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginPayload = z.infer<typeof loginSchema>;

export const loginDefaultValues = getDefaults(loginSchema);

export const passwordObjectSchema = z.object({password: passwordSchema});
export const emailObjectSchema = z.object({email: emailSchema});

export type PasswordPayload = z.infer<typeof passwordObjectSchema>;
export type EmailPayload = z.infer<typeof emailObjectSchema>;
