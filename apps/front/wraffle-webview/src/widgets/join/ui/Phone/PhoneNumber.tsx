import type {JoinPayload} from '../../config';
import {useCallback, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {RequestCode} from '@/features/validate-phone/ui/RequestCode';
import {Button, Typography} from '@wraffle/ui';

interface PhoneNumberProps {
  onNext(phoneNumber: string): void;
}

const PhoneNumber = ({onNext}: PhoneNumberProps) => {
  const {
    formState: {errors},
    setValue,
    getValues,
  } = useFormContext<JoinPayload>();

  const [isVerified, handleIsVerified] = useState(false);

  const handlePhoneNumber = useCallback(
    (phone: string) => {
      setValue('phoneNumber', phone, {shouldValidate: true});
    },
    [setValue],
  );

  return (
    <div>
      <div className='mb-12'>
        <Typography as='p' size='h2'>
          휴대폰 인증을 진행할게요!
        </Typography>
        <Typography as='p' size='p3' color='zinc400'>
          휴대폰 정보를 입력해주세요.
        </Typography>
      </div>

      <RequestCode
        onChangePhoneNumber={handlePhoneNumber}
        onChangeIsVerified={handleIsVerified}
        error={errors.phoneNumber}
      />

      <div className='fixed inset-x-0 bottom-0 bg-white p-5'>
        <Button
          type='button'
          onClick={() => onNext(getValues('phoneNumber'))}
          disabled={!isVerified || !!errors.phoneNumber}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default PhoneNumber;
