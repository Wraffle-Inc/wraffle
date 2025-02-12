import {useRequestCode} from '../api/request';
import type {RequestCodeRequest} from '../config/type';
import type {Dispatch, SetStateAction} from 'react';
import {useCallback, useEffect, useState} from 'react';
import type {FieldError} from 'react-hook-form';
import {useAutoFocus, useInput} from '@/shared/hook';
import {handleMaxLength} from '@/shared/util';
import {InputField, Select} from '@wraffle/ui';

const MAX_INPUT_LENGTH = 4;

interface RequestCodeProps {
  defaultValue?: {
    first: string;
    middle: string;
    last: string;
  };
  onChangePhoneNumber: (phone: string) => void;
  onChangeIsVerified: Dispatch<SetStateAction<boolean>>;
  error?: FieldError;
}

const RequestCode = ({
  defaultValue = {first: '', middle: '', last: ''},
  onChangePhoneNumber,
  onChangeIsVerified,
  error,
}: RequestCodeProps) => {
  const [middleInputRef, handleMiddleKeyUp] = useAutoFocus(MAX_INPUT_LENGTH);
  const [lastInputRef, handleLastKeyUp] = useAutoFocus(MAX_INPUT_LENGTH);

  const [first, setFirst] = useState(defaultValue.first);
  const [middle, handleMiddle] = useInput(defaultValue.middle);
  const [last, handleLast] = useInput(defaultValue.last);
  const [errorMessage, setErrorMessage] = useState('');

  const {requestCode} = useRequestCode();

  const handleRequestCode = useCallback(
    ({phoneNumber}: RequestCodeRequest) => {
      requestCode(
        {phoneNumber},
        {
          onSuccess: () => {
            onChangeIsVerified(true);
          },
          onError: (error: Error) => {
            setErrorMessage(error.message);
            onChangeIsVerified(false);
          },
        },
      );
    },
    [onChangeIsVerified, requestCode],
  );

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
      handleRequestCode({phoneNumber});
    }
  }, [
    first,
    handleRequestCode,
    isValid,
    last,
    middle,
    onChangeIsVerified,
    onChangePhoneNumber,
  ]);

  return (
    <InputField>
      <InputField.Label htmlFor='phone'>휴대폰 번호*</InputField.Label>
      <Select
        defaultValue={defaultValue ? defaultValue.first : ''}
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
