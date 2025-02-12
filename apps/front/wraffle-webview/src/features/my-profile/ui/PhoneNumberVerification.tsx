import {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import type {EditUserPayload} from '@/entities/auth/user/schema';
import {
  useSendVerificationCode,
  useVerifyVerificationCode,
} from '@/features/validate-phone/api';
import {RequestCode} from '@/features/validate-phone/ui';
import {useInput} from '@/shared/hook';
import {Button, InputField, useToast} from '@wraffle/ui';

interface PhoneNumberVerificationProps {
  defaultPhoneNumber: string;
  setIsCodeVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const PhoneNumberVerification = ({
  defaultPhoneNumber,
  setIsCodeVerified,
}: PhoneNumberVerificationProps) => {
  const {toast} = useToast();
  const {setValue, watch} = useFormContext<EditUserPayload>();

  const phoneNumber = watch('phoneNumber');

  const [code, handleCode] = useInput('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);

  const requestSendVerifyCode = useSendVerificationCode();
  const requestVerifyVerificationCode = useVerifyVerificationCode();

  const handlePhoneNumber = (phone: string) => {
    setValue('phoneNumber', phone, {shouldValidate: true});

    setIsCodeVerified(false);
    setIsVerified(false);
    setShowCodeInput(false);
  };

  const handleVerifyCodeSend = () => {
    const phoneNumber = watch('phoneNumber');

    requestSendVerifyCode(
      {phoneNumber},
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
          setErrorMessage(error.message);
        },
      },
    );
  };

  const handleVerifyCodeCheck = () => {
    requestVerifyVerificationCode(
      {
        phoneNumber: phoneNumber,
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
        },
        onError: (error: Error) => {
          setErrorMessage(error.message);
        },
      },
    );
  };

  const isPhoneNumberChanged = () => {
    return phoneNumber !== defaultPhoneNumber;
  };

  return (
    <div>
      <RequestCode
        defaultValue={{
          first: defaultPhoneNumber.slice(0, 3),
          middle: defaultPhoneNumber.slice(3, 7),
          last: defaultPhoneNumber.slice(7, 11),
        }}
        onChangePhoneNumber={handlePhoneNumber}
        onChangeIsVerified={setIsVerified}
      />

      <Button
        type='button'
        variant='stroke'
        onClick={handleVerifyCodeSend}
        disabled={!isPhoneNumberChanged() || !isVerified}
      >
        인증번호 전송
      </Button>

      {showCodeInput && (
        <div className='flex py-3'>
          <InputField className='w-2/3 flex-shrink-0'>
            <InputField.Input
              value={code}
              onChange={handleCode}
              placeholder='인증번호를 입력해주세요.'
            />
            <InputField.ErrorMessage isError>
              {errorMessage}
            </InputField.ErrorMessage>
          </InputField>

          <Button
            type='button'
            className='ml-4 mt-2 h-[55px]'
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
