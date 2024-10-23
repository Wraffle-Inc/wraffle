import {ThumbnailCard} from '@/entities/create/ui';
import {Button, Label, Typography} from '@wraffle/ui';

// TODO
// image api 연동
// 이미지 추가 부분은 api연동하며 구현하겠습니다
export const ImageStep = ({onNext}: {onNext: (images: string[]) => void}) => {
  const images: string[] = [''];
  return (
    <div className='flex h-full flex-col px-5 pb-20'>
      <div className='mb-5'>
        <Typography className='text-2xl font-bold'>
          이미지가 있으면 좋을거 같아요!
        </Typography>
        <Typography className='text-sm font-medium text-[#ADB5BD]'>
          이미지는 최대 4장까지 추가 가능해요
        </Typography>
      </div>

      <div className='mb-4 flex items-end'>
        <Typography className='text-xl font-bold text-zinc-900'>
          이미지*
        </Typography>
        <Label className='pb-0.5 text-[0.625rem] font-medium text-zinc-900'>
          최대 4장
        </Label>
      </div>

      <div className='grid w-full max-w-[21rem] grid-cols-2 gap-4 sm:max-w-[55rem] sm:grid-cols-4'>
        {images.map((url, i) => (
          <ThumbnailCard key={i} url={url} />
        ))}
        {images.length < 4 && (
          <div className='relative flex aspect-square max-h-40 w-full max-w-40 rounded-lg border border-solid border-[#F5F5F7] bg-[#FAFAFB] sm:max-h-52 sm:max-w-52'>
            <div className='flex h-full w-full items-center justify-center rounded-lg text-center text-sm font-medium text-[#ADB5BD]'>
              이미지 추가
            </div>
          </div>
        )}
      </div>

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          type='button'
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
          // disabled={images.length === 0} // api연동 후 풀게요
          onClick={() => onNext(images)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
