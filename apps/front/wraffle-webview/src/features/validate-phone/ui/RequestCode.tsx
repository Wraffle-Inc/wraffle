import type {Dispatch, SetStateAction} from 'react';
import {useEffect, useState} from 'react';
import type {FieldError} from 'react-hook-form';
import {useAutoFocus, useInput} from '@/shared/hook';
import {handleMaxLength} from '@/shared/util';
import {InputField, Select} from '@wraffle/ui';

const MAX_INPUT_LENGTH = 4;

interface RequestCodeProps {
  onChangePhoneNumber: (phone: string) => void;
  onChangeIsVerified: Dispatch<SetStateAction<boolean>>;
  error?: FieldError;
}

const RequestCode = ({
  onChangePhoneNumber,
  onChangeIsVerified,
  error,
}: RequestCodeProps) => {
  const [middleInputRef, handleMiddleKeyUp] = useAutoFocus(MAX_INPUT_LENGTH);
  const [lastInputRef, handleLastKeyUp] = useAutoFocus(MAX_INPUT_LENGTH);

  const [first, setFirst] = useState('');
  const [middle, handleMiddle] = useInput('');
  const [last, handleLast] = useInput('');
  const [errorMessage, setErrorMessage] = useState('');

  const isValid =
    first &&
    (middle.length === MAX_INPUT_LENGTH ||
      middle.length === MAX_INPUT_LENGTH - 1) &&
    last.length === MAX_INPUT_LENGTH;

  useEffect(() => {
    onChangeIsVerified(false);
    setErrorMessage('');
    if (isValid) {
      const phoneNumber = first.concat(middle, last);
      onChangePhoneNumber(phoneNumber);
      // !TODO: request API
      // 성공 시 onChangeIsVerified(true)
      onChangeIsVerified(true);
      // 실패 시 setErrorMessage에 에러메세지
      // setErrorMessage('이미 가입된 번호입니다.');
      // onChangeIsVerified(false);
    }
  }, [first, middle, last]);

  return (
    <InputField>
      <InputField.Label htmlFor='phone'>휴대폰 번호*</InputField.Label>
      <Select
        onValueChange={value => setFirst(value)}
        placeholder='선택'
        items={[
          {value: '010', name: '010'},
          {value: '02', name: '02'},
          {value: '031', name: '031'},
          {value: '032', name: '032'},
        ]}
      />
      <InputField.Input
        ref={middleInputRef}
        id='middle'
        placeholder=''
        type='number'
        maxLength={MAX_INPUT_LENGTH}
        value={middle}
        onChange={handleMiddle}
        onInput={handleMaxLength}
        onKeyUp={e => handleMiddleKeyUp(e, lastInputRef)}
      />
      <InputField.Input
        ref={lastInputRef}
        id='last'
        placeholder=''
        type='number'
        maxLength={MAX_INPUT_LENGTH}
        value={last}
        onChange={handleLast}
        onInput={handleMaxLength}
        onKeyUp={e => handleLastKeyUp(e, null)}
      />
      <InputField.ErrorMessage isError>
        {error && error.message}
        {!error && errorMessage}
      </InputField.ErrorMessage>
    </InputField>
  );
};

export {RequestCode};
