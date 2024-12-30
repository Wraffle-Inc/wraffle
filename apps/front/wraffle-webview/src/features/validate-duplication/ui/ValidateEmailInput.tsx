import {useValidateDuplication} from '../api/validate';
import {useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import {useDebounce} from '@/shared/hook';
import {RHFInput} from '@/shared/ui';
import type {JoinPayload} from '@/widgets/join/config';

const ValidateEmailInput = () => {
  const {
    formState: {errors},
    trigger,
    watch,
    setError,
    clearErrors,
  } = useFormContext<JoinPayload>();

  const email = watch('email');
  const debouncedEmail = useDebounce(email);

  const {validateDuplication: validateEmailDuplication} =
    useValidateDuplication();

  useEffect(() => {
    const validateEmailSchema = async () => {
      const isValid = await trigger('email');
      if (isValid && email) {
        setError('email', {
          type: 'validate',
          message: '이메일 중복 검사가 진행 중입니다.',
        });
      }
    };
    if (!email) return;
    validateEmailSchema();
  }, [email]);

  useEffect(() => {
    if (debouncedEmail && errors.email?.type === 'validate') {
      validateEmailDuplication(
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
  }, [debouncedEmail]);

  return (
    <RHFInput
      name='email'
      label='이메일*'
      placeholder='이메일을 입력해주세요.'
    />
  );
};

export {ValidateEmailInput};
