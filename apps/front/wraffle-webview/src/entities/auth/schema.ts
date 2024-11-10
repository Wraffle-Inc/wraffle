import {z} from 'zod';

export const passwordRegex = new RegExp(
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~@#$!%*?&])[a-zA-Z\d~@#$!%*?&]{8,}$/,
);

export const emailSchema = z
  .string()
  .min(1, {message: '이메일을 입력해 주세요.'})
  .email({message: '유효하지 않은 이메일 형식입니다.'})
  .default('');

export const passwordSchema = z
  .string()
  .regex(
    passwordRegex,
    '비밀번호는 영문, 숫자, 특수문자 조합으로 8자 이상 형식입니다.',
  )
  .default('');

export const passwordObjectSchema = z.object({password: passwordSchema});
export const emailObjectSchema = z.object({email: emailSchema});

export type PasswordPayload = z.infer<typeof passwordObjectSchema>;
export type EmailPayload = z.infer<typeof emailObjectSchema>;
