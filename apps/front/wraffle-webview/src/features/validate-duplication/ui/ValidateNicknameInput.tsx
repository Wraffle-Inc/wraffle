import {useValidateDuplication} from '../api/validate';
import {useCallback, useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import {useDebounce} from '@/shared/hook';
import {RHFInput} from '@/shared/ui';
import {nicknameSchema, type JoinPayload} from '@/widgets/join/config';

const ValidateNicknameInput = () => {
  const {watch, setError, clearErrors, trigger} = useFormContext<JoinPayload>();

  const nickname = watch('nickname');
  const debouncedNickname = useDebounce(nickname);

  const {validateDuplication: validateNicknameApi} = useValidateDuplication();

  const validateNicknameSchema = useCallback(async () => {
    const isValid = await trigger('nickname');
    if (isValid) {
      setError('nickname', {
        type: 'validate',
        message: '닉네임 중복 검사가 진행 중입니다.',
      });
    }
  }, [setError, trigger]);

  const validateEmailDuplication = useCallback(async () => {
    const isValidSchema =
      await nicknameSchema.safeParseAsync(debouncedNickname);
    if (isValidSchema.success && debouncedNickname) {
      validateNicknameApi(
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
  }, [clearErrors, debouncedNickname, setError, validateNicknameApi]);

  useEffect(() => {
    if (!nickname) return;
    validateNicknameSchema();
  }, [nickname, validateNicknameSchema]);

  useEffect(() => {
    validateEmailDuplication();
  }, [validateEmailDuplication]);

  return (
    <RHFInput
      name='nickname'
      label='닉네임*'
      placeholder='닉네임을 입력해주세요.'
    />
  );
};

export {ValidateNicknameInput};
