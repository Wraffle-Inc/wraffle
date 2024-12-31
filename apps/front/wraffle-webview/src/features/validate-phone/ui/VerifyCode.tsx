import {useVerifyCode} from '../api/verify';
import {DEFAULT_ERROR_MESSAGE, VERIFY_CODE_LENGTH} from '../config/const';
import type {VerifyCodeRequest} from '../config/type';
import {useCallback, useEffect, useState} from 'react';
import {useInput} from '@/shared/hook';
import {handleMaxLength} from '@/shared/util';
import {InputField} from '@wraffle/ui';

interface VerifyCodeProps {
  phoneNumber: string;
  onSuccess: () => void;
}

const VerifyCode = ({phoneNumber, onSuccess}: VerifyCodeProps) => {
  const [code, handleCode] = useInput('');
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR_MESSAGE);

  const {verifyCode} = useVerifyCode();

  const handleVerifyCode = useCallback(
    ({phoneNumber, code}: VerifyCodeRequest) => {
      verifyCode(
        {phoneNumber, code},
        {
          onSuccess: () => {
            onSuccess();
          },
          onError: (error: Error) => {
            setErrorMessage(error.message);
          },
        },
      );
    },
    [onSuccess, verifyCode],
  );

  useEffect(() => {
    setErrorMessage(DEFAULT_ERROR_MESSAGE);
    if (code.length === VERIFY_CODE_LENGTH) {
      handleVerifyCode({phoneNumber, code});
    }
  }, [code, handleVerifyCode, phoneNumber]);

  return (
    <InputField>
      <InputField.Input
        type='number'
        maxLength={VERIFY_CODE_LENGTH}
        value={code}
        onChange={handleCode}
        onInput={handleMaxLength}
      />
      <InputField.ErrorMessage isError>{errorMessage}</InputField.ErrorMessage>
    </InputField>
  );
};

export {VerifyCode};
