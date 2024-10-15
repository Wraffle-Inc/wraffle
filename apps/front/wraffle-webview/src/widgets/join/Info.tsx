import {useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import type {JoinPayload} from '@/entities/auth/join/schema';
import {RHFInput} from '@/shared/ui';
import {Button, Typography} from '@wraffle/ui';

interface InfoProps {
  onNext(email: string, password: string): void;
}

const Info = ({onNext}: InfoProps) => {
  const {
    formState: {errors, touchedFields},
    watch,
    trigger,
  } = useFormContext<JoinPayload>();

  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const isDisabled = () => {
    return (
      !email ||
      !password ||
      !confirmPassword ||
      !!errors.email ||
      !!errors.password ||
      !!errors.confirmPassword
    );
  };

  useEffect(() => {
    if (touchedFields.password) {
      trigger('confirmPassword');
    }
  }, [password]);

  return (
    <div>
      <div className='mb-5'>
        <Typography className='text-2xl font-bold'>
          회원 가입을 진행할게요!
        </Typography>
        <Typography className='text-sm font-medium text-[#ADB5BD]'>
          기본 정보를 입력해주세요.
        </Typography>
      </div>

      <RHFInput
        name='email'
        label='이메일*'
        placeholder='이메일을 입력해주세요.'
      />
      <RHFInput
        type='password'
        name='password'
        label='비밀번호*'
        placeholder='비밀번호를 입력해주세요.'
      />
      <RHFInput
        type='password'
        name='confirmPassword'
        label='비밀번호 확인*'
        placeholder='비밀번호를 입력해주세요.'
      />

      <div className='fixed inset-x-0 bottom-0 bg-white p-5'>
        <Button onClick={() => onNext(email, password)} disabled={isDisabled()}>
          다음
        </Button>
      </div>
    </div>
  );
};

export {Info};
