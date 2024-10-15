import {z} from 'zod';
import {getDefaults} from '@/shared/util';

const passwordRegex = new RegExp(
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~@#$!%*?&])[a-zA-Z\d~@#$!%*?&]{8,}$/,
);

const emailSchema = z
  .string()
  .min(1, {message: '이메일을 입력해 주세요.'})
  .email({message: '유효하지 않은 이메일 형식입니다.'})
  .default('');

const passwordSchema = z
  .string()
  .regex(
    passwordRegex,
    '비밀번호는 영문, 숫자, 특수문자 조합으로 8자 이상 형식입니다.',
  )
  .default('');

const confirmPasswordSchema = z
  .string()
  .regex(
    passwordRegex,
    '비밀번호는 영문, 숫자, 특수문자 조합으로 8자 이상 형식입니다.',
  )
  .default('');

const nameSchema = z
  .string()
  .min(1, {message: '이름을 입력해 주세요.'})
  .default('');

const nicknameSchema = z
  .string()
  .min(1, {message: '닉네임을 입력해 주세요.'})
  .default('');

const phoneNumberSchema = z
  .string()
  .min(1, {message: '전화번호를 입력해 주세요.'})
  .default('');

const isAgreedSchema = z
  .boolean()
  .default(false)
  .refine(val => val === true, {
    message: '필수 선택입니다.',
  });
const isPrivacyAgreedSchema = z
  .boolean()
  .default(false)
  .refine(val => val === true, {
    message: '필수 선택입니다.',
  });
const isThirdAgreedSchema = z
  .boolean()
  .default(false)
  .refine(val => val === true, {
    message: '필수 선택입니다.',
  });
const isMarketingAgreedSchema = z.boolean().optional().default(false);

export const joinSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    name: nameSchema,
    nickname: nicknameSchema,
    phoneNumber: phoneNumberSchema,
    isAgreed: isAgreedSchema,
    isPrivacyAgreed: isPrivacyAgreedSchema,
    isThirdAgreed: isThirdAgreedSchema,
    isMarketingAgreed: isMarketingAgreedSchema,
  })
  .refine(data => data.confirmPassword === data.password, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type JoinPayload = z.infer<typeof joinSchema>;

export const joinDefaultValues = getDefaults(joinSchema.innerType());
