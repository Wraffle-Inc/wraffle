import {useValidateDuplication} from '../api/validate';
import {useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import {useDebounce} from '@/shared/hook';
import {RHFInput} from '@/shared/ui';
import type {JoinPayload} from '@/widgets/join/config';

const ValidateNicknameInput = () => {
  const {
    formState: {errors},
    trigger,
    watch,
    setError,
    clearErrors,
  } = useFormContext<JoinPayload>();

  const nickname = watch('nickname');
  const debouncedNickname = useDebounce(nickname);

  const {validateDuplication: validateNicknameDuplication} =
    useValidateDuplication();

  useEffect(() => {
    const validateNicknameSchema = async () => {
      const isValid = await trigger('nickname');
      if (isValid && nickname) {
        setError('nickname', {
          type: 'validate',
          message: '닉네임 중복 검사가 진행 중입니다.',
        });
      }
    };

    if (!nickname) return;
    validateNicknameSchema();
  }, [nickname]);

  useEffect(() => {
    if (debouncedNickname && errors.nickname?.type === 'validate') {
      validateNicknameDuplication(
        {nickname: debouncedNickname},
        {
          onSuccess: () => {
            clearErrors('nickname');
          },
          onError: (error: Error) => {
            setError('nickname', {message: error.message});
          },
        },
      );
    }
  }, [debouncedNickname]);

  return (
    <RHFInput
      name='nickname'
      label='닉네임*'
      placeholder='닉네임을 입력해주세요.'
    />
  );
};

export {ValidateNicknameInput};
