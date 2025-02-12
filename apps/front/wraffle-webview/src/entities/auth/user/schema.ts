import {z} from 'zod';
import {getDefaults} from '@/shared/util';

const nicknameSchema = z
  .string()
  .min(1, {message: '닉네임을 입력해 주세요.'})
  .default('');

const emailSchema = z
  .string()
  .min(1, {message: '이메일을 입력해 주세요.'})
  .email({message: '유효하지 않은 이메일 형식입니다.'})
  .default('');

const phoneNumberSchema = z
  .string()
  .min(1, {message: '전화번호를 입력해 주세요.'})
  .default('');

export const editUserSchema = z.object({
  nickname: nicknameSchema,
  email: emailSchema,
  phoneNumber: phoneNumberSchema,
});

export type EditUserPayload = z.infer<typeof editUserSchema>;

export const editUserDefaultValues = getDefaults(editUserSchema);
