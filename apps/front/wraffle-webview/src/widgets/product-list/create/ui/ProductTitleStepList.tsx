import {useState} from 'react';
import {Button, InputField, Typography} from '@wraffle/ui';

export const ProductTitleStep = ({
  onNext,
}: {
  onNext: (title: string) => void;
}) => {
  const [title, setTitle] = useState<string>('');
  return (
    <div className='flex h-full flex-col px-5 pb-20'>
      <div className='mb-5'>
        <Typography className='text-2xl font-bold'>
          추첨상품을 추가해볼까요?
        </Typography>
        <Typography className='text-sm font-medium text-[#ADB5BD]'>
          추첨 상품에 대해 알려주세요.
        </Typography>
      </div>

      <InputField>
        <InputField.Label htmlFor='title' className='text-xl font-bold'>
          제목*
        </InputField.Label>
        <InputField.Input
          className='border-[#F5F5F7] bg-[#FAFAFB] placeholder:text-[#ADB5BD]'
          id='title'
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='상품 제목을 입력해주세요.'
        />
      </InputField>

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          type='button'
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
          disabled={!title}
          onClick={() => onNext(title)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
