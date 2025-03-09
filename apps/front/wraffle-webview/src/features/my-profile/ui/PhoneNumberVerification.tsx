import {useCallback, useEffect, useMemo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import type {EditUserPayload} from '@/entities/auth/user/schema';
import {
  useSendVerificationCode,
  useVerifyVerificationCode,
} from '@/features/validate-phone/api';
import {useInput} from '@/shared/hook';
import {Button, InputField, Select, useToast} from '@wraffle/ui';

const MAX_INPUT_LENGTH = 4;

interface PhoneNumberVerificationProps {
  defaultPhoneNumber: string;
  setIsCodeVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const PhoneNumberVerification = ({
  defaultPhoneNumber,
  setIsCodeVerified,
}: PhoneNumberVerificationProps) => {
  const {toast} = useToast();
  const {setValue} = useFormContext<EditUserPayload>();

  const [code, handleCode] = useInput('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  const requestSendVerifyCode = useSendVerificationCode();
  const requestVerifyVerificationCode = useVerifyVerificationCode();

  const defaultValue = useMemo(() => {
    const phoneLength = {
      middle: defaultPhoneNumber.startsWith('02') ? 2 : 3,
      last: defaultPhoneNumber.startsWith('02') ? 6 : 7,
    };

    return {
      first: defaultPhoneNumber.slice(0, phoneLength.middle),
      middle: defaultPhoneNumber.slice(phoneLength.middle, phoneLength.last),
      last: defaultPhoneNumber.slice(phoneLength.last),
    };
  }, [defaultPhoneNumber]);

  const [first, setFirst] = useState(defaultValue.first);
  const [middle, setMiddle] = useState(defaultValue.middle);
  const [last, setLast] = useState(defaultValue.last);

  useEffect(() => {
    if (defaultPhoneNumber) {
      const phoneLength = {
        middle: defaultPhoneNumber.startsWith('02') ? 2 : 3,
        last: defaultPhoneNumber.startsWith('02') ? 6 : 7,
      };

      setFirst(defaultPhoneNumber.slice(0, phoneLength.middle));
      setMiddle(defaultPhoneNumber.slice(phoneLength.middle, phoneLength.last));
      setLast(defaultPhoneNumber.slice(phoneLength.last));
    }
  }, [defaultPhoneNumber]);

  const handleVerifyCodeSend = useCallback(() => {
    requestSendVerifyCode(
      {phoneNumber: first + middle + last},
      {
        onSuccess: () => {
          toast({
            title: '인증번호가 발송되었습니다.',
            duration: 1000,
            variant: 'success',
            icon: 'check',
          });
          setShowCodeInput(true);
        },
        onError: (error: Error) => {
          toast({
            title: `${error.message}`,
            duration: 2000,
            variant: 'warning',
            icon: 'cross',
          });
        },
      },
    );
  }, [first, last, middle, requestSendVerifyCode, toast]);

  const handleVerifyCodeCheck = useCallback(() => {
    requestVerifyVerificationCode(
      {
        phoneNumber: first + middle + last,
        code: code,
      },
      {
        onSuccess: () => {
          toast({
            title: '인증이 완료되었습니다.',
            duration: 1000,
            variant: 'success',
            icon: 'check',
          });
          setIsCodeVerified(true);

          setValue('phoneNumber', first + middle + last);
        },
        onError: (error: Error) => {
          setErrorMessage(error.message);
        },
      },
    );
  }, [
    code,
    first,
    last,
    middle,
    requestVerifyVerificationCode,
    setIsCodeVerified,
    setValue,
    toast,
  ]);

  const isPhoneNumberChanged = defaultPhoneNumber !== first + middle + last;

  return (
    <div>
      <InputField>
        <InputField.Label htmlFor='phoneNumber'>휴대폰 번호*</InputField.Label>

        <Select
          value={first}
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
          value={middle}
          onChange={e => setMiddle(e.target.value)}
          placeholder=''
          maxLength={MAX_INPUT_LENGTH}
          type='number'
        />

        <InputField.Input
          value={last}
          onChange={e => setLast(e.target.value)}
          placeholder=''
          maxLength={MAX_INPUT_LENGTH}
          type='number'
        />
      </InputField>

      <Button
        type='button'
        variant='stroke'
        onClick={handleVerifyCodeSend}
        disabled={!isPhoneNumberChanged}
      >
        인증번호 전송
      </Button>

      {showCodeInput && (
        <div className='flex py-3'>
          <InputField className='w-2/3 flex-shrink-0'>
            <InputField.Input
              value={code}
              onChange={handleCode}
              maxLength={6}
              placeholder='인증번호를 입력해주세요.'
            />
            <InputField.ErrorMessage isError>
              {errorMessage}
            </InputField.ErrorMessage>
          </InputField>

          <Button
            type='button'
            className='ml-4 mt-2 h-[55px]'
            disabled={!code || code.length < 6}
            onClick={handleVerifyCodeCheck}
          >
            확인
          </Button>
        </div>
      )}
    </div>
  );
};

export default PhoneNumberVerification;
