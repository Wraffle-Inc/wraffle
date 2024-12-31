import {useValidateDuplication} from '../api/validate';
import {useCallback, useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import {emailSchema} from '@/entities/auth';
import {useDebounce} from '@/shared/hook';
import {RHFInput} from '@/shared/ui';
import type {JoinPayload} from '@/widgets/join/config';

const ValidateEmailInput = () => {
  const {watch, setError, clearErrors, trigger} = useFormContext<JoinPayload>();

  const email = watch('email');
  const debouncedEmail = useDebounce(email);

  const {validateDuplication: validateEmailApi} = useValidateDuplication();

  const validateEmailSchema = useCallback(async () => {
    const isValid = await trigger('email');
    if (isValid) {
      setError('email', {
        type: 'validate',
        message: '이메일 중복 검사가 진행 중입니다.',
      });
    }
  }, [setError, trigger]);

  const validateEmailDuplication = useCallback(async () => {
    const isValidSchema = await emailSchema.safeParseAsync(debouncedEmail);
    if (isValidSchema.success && debouncedEmail) {
      validateEmailApi(
        {email: debouncedEmail},
        {
          onSuccess: () => {
            clearErrors('email');
          },
          onError: (error: Error) => {
            setError('email', {message: error.message});
          },
        },
      );
    }
  }, [clearErrors, debouncedEmail, setError, validateEmailApi]);

  useEffect(() => {
    if (!email) return;
    validateEmailSchema();
  }, [email, validateEmailSchema]);

  useEffect(() => {
    validateEmailDuplication();
  }, [validateEmailDuplication]);

  return (
    <RHFInput
      name='email'
      label='이메일*'
      placeholder='이메일을 입력해주세요.'
    />
  );
};

export {ValidateEmailInput};
