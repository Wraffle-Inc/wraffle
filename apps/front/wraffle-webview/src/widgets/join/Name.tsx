import {useFormContext} from 'react-hook-form';
import type {JoinPayload} from '@/entities/auth/join/schema';
import {RHFInput} from '@/shared/ui';
import {Button, Typography} from '@wraffle/ui';

interface NameProps {
  onNext(name: string, nickname: string): void;
}

const Name = ({onNext}: NameProps) => {
  const {
    getValues,
    formState: {errors},
  } = useFormContext<JoinPayload>();

  return (
    <div>
      <div className='mb-5'>
        <Typography className='text-2xl font-bold'>
          쓰고 싶은 닉네임이 있나요?
        </Typography>
        <Typography className='text-sm font-medium text-[#ADB5BD]'>
          이름과 닉네임을 알려주세요!
        </Typography>
      </div>

      <RHFInput name='name' label='이름*' placeholder='이름을 입력해주세요.' />
      <RHFInput
        name='nickname'
        label='닉네임*'
        placeholder='닉네임을 입력해주세요.'
      />

      <div className='fixed inset-x-0 bottom-0 bg-white p-5'>
        <Button
          onClick={() => onNext(getValues('name'), getValues('nickname'))}
          disabled={
            !!(
              getValues('name') === '' ||
              getValues('nickname') === '' ||
              errors.name ||
              errors.nickname
            )
          }
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export {Name};
