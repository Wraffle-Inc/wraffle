import type {JoinPayload} from '../../config';
import {useFormContext} from 'react-hook-form';
import {VerifyCode} from '@/features/validate-phone/ui/VerifyCode';
import {Timer} from '@/shared/ui';
import {Typography} from '@wraffle/ui';

interface CodeProps {
  onNext(code: string): void;
}

const Code = ({onNext}: CodeProps) => {
  const {getValues} = useFormContext<JoinPayload>();

  const handleVerify = () => {
    onNext(getValues('phoneNumber'));
  };

  return (
    <div>
      <div className='mb-12'>
        <Typography as='p' size='h2'>
          휴대폰 인증을 진행할게요!
        </Typography>
        <Typography as='p' size='p3' color='zinc400'>
          인증번호를 입력해주세요.
        </Typography>
      </div>

      <VerifyCode onSuccess={handleVerify} />
      <div className='flex justify-end pr-2 pt-1'>
        <Timer timerSecond={180} />
      </div>
    </div>
  );
};

export default Code;
