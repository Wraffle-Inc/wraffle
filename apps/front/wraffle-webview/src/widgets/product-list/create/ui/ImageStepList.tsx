import {AddItemCard, ImageCardWithDelete} from '@/features/image-handle';
import {Button, Label, Typography} from '@wraffle/ui';

// TODO
// image api 연동
// 이미지 추가 부분은 api연동하며 구현하겠습니다
export const ImageStep = ({onNext}: {onNext: (images: string[]) => void}) => {
  const images: string[] = [''];
  return (
    <div className='flex h-full flex-col px-5 pb-20'>
      <div className='mb-5'>
        <Typography as='h2' size='h2'>
          이미지가 있으면 좋을거 같아요!
        </Typography>
        <Typography as='p' size='p3' color='zinc400'>
          이미지는 최대 4장까지 추가 가능해요
        </Typography>
      </div>

      <div className='mb-4 flex items-end'>
        <Typography as='h3' size='h3'>
          이미지*
        </Typography>
        <Label className='pb-0.5 text-[0.625rem] font-medium text-zinc-900'>
          최대 4장
        </Label>
      </div>

      <div className='flex flex-wrap gap-4'>
        {images.map(url => (
          <ImageCardWithDelete
            key={url}
            url={url}
            onClick={() => {}}
            className='h-40 w-40'
          />
        ))}
        {images.length < 4 && (
          <AddItemCard
            label='이미지 추가'
            onClick={() => {}}
            className='h-40 w-40'
          />
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
