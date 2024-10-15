import {useFormContext} from 'react-hook-form';
import type {LoginPayload} from '@/entities/auth';
import {RHFInput} from '@/shared/ui';
import {Button} from '@wraffle/ui';

const EmailForm = () => {
  const {formState} = useFormContext<LoginPayload>();

  return (
    <>
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
      <Button
        className='mt-10 text-[15px]'
        type='submit'
        disabled={!formState.isValid}
      >
        로그인
      </Button>
    </>
  );
};

export {EmailForm};
