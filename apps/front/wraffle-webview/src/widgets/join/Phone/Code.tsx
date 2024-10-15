import {useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import type {JoinPayload} from '@/entities/auth/join/schema';
import useInput from '@/shared/hook/useInput';
import {Timer} from '@/shared/ui';
import {Input, Typography} from '@wraffle/ui';

interface CodeProps {
  onNext(code: string): void;
}

const Code = ({onNext}: CodeProps) => {
  const {getValues} = useFormContext<JoinPayload>();

  const [code, handleCode] = useInput('');

  useEffect(() => {
    // !TODO: 인증번호 API 응답에 따라 onNext 실행
    if (code.length === 4) {
      onNext(getValues('phoneNumber'));
    }
  }, [code]);

  return (
    <div>
      <div className='mb-12'>
        <Typography className='text-2xl font-bold'>
          휴대폰 인증을 진행할게요!
        </Typography>
        <Typography className='text-sm font-medium text-[#ADB5BD]'>
          인증번호를 입력해주세요.
        </Typography>
      </div>

      <Input value={code} onChange={handleCode} />
      <div className='flex justify-end pr-2 pt-1'>
        <Timer timerSecond={180} />
      </div>
    </div>
  );
};

export default Code;
