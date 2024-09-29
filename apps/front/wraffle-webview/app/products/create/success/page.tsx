import Image from 'next/image';
import {Button, Typography} from '@wraffle/ui';

// 이미지 비율
// 버튼 ? 링크
const SuccessPage = () => {
  const isReview = false;

  return (
    <div className='flex h-full flex-col items-center px-4 py-6'>
      <div className='mb-24 w-full text-left'>
        <Typography className='text-2xl font-bold'>
          {isReview ? (
            <>
              래플 생성 요청이
              <br />
              정상적으로 전달되었어요!
            </>
          ) : (
            '래플이 생성되었어요!'
          )}
        </Typography>

        <Typography className='text-sm font-medium'>
          {isReview
            ? '내용에 문제가 없는지 검토 후, 알려드릴게요!'
            : '지금 바로 확인해보러 갈까요?'}
        </Typography>
      </div>

      <Image
        src={''}
        width={250}
        height={250}
        alt='produts-image'
        className='h-60 w-60 rounded-lg bg-blue-200'
      />

      <div className='fixed inset-x-0 bottom-0 px-4 py-4'>
        <Button className='h-[45px]'>
          {isReview ? '다른 래플 구경하기' : '방금 생성한 래플 확인하러가기'}
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
