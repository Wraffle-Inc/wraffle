import {DEFAULT_ERROR_MESSAGE, VERIFY_CODE_LENGTH} from '../config/const';
import {useEffect, useState} from 'react';
import {useInput} from '@/shared/hook';
import {InputField} from '@wraffle/ui';

interface VerifyCodeProps {
  onSuccess: () => void;
}

const VerifyCode = ({onSuccess}: VerifyCodeProps) => {
  const [code, handleCode] = useInput('');
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR_MESSAGE);

  useEffect(() => {
    setErrorMessage(DEFAULT_ERROR_MESSAGE);
    if (code.length === VERIFY_CODE_LENGTH) {
      // !TODO: reuqest API
      // 성공 시 onSuccess();
      onSuccess();
      // 실패 시 setErrorMessage(MISMATCHED_CODE_ERROR_MESSAGE);
    }
  }, [code]);

  return (
    <InputField>
      <InputField.Input value={code} onChange={handleCode} />
      <InputField.ErrorMessage isError>{errorMessage}</InputField.ErrorMessage>
    </InputField>
  );
};

export {VerifyCode};
