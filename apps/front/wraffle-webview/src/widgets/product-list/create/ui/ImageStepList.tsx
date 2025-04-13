import {useFormContext, useWatch} from 'react-hook-form';
import type {CreateEventPayload} from '@/entities/product/model';
import {AddItemCard, ImageCardWithDelete} from '@/features/image-handle';
import {useImageUpload} from '@/features/image-handle/hooks/useImageUpload';
import {Button, Label, Typography, useToast} from '@wraffle/ui';

export const ImageStep = ({onNext}: {onNext: (images: string[]) => void}) => {
  const {toast} = useToast();
  const {control, setValue} = useFormContext<CreateEventPayload>();

  const [images] = useWatch({
    control,
    name: ['images'],
  });

  const {fileInputRef, handleImageUpload, triggerFileInput} = useImageUpload({
    onSuccess: (url: string) => {
      setValue('images', [...images, url].slice(0, 4));
    },
    onError: (error: Error) => {
      toast({
        title: error.message,
        duration: 2000,
        variant: 'warning',
        icon: 'close',
      });
    },
  });

  const handleImageDelete = (index: number) => {
    setValue(
      'images',
      images.filter((_, i) => i !== index),
    );
  };

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

      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='image/*'
        onChange={handleImageUpload}
      />

      <div className='flex flex-wrap gap-4'>
        {images.map((url, index) => (
          <ImageCardWithDelete
            key={url}
            url={url}
            onClick={() => handleImageDelete(index)}
            className='h-40 w-40'
          />
        ))}
        {images.length < 4 && (
          <AddItemCard
            label='이미지 추가'
            onClick={triggerFileInput}
            className='h-40 w-40'
          />
        )}
      </div>

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          type='button'
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
          disabled={images.length === 0}
          onClick={() => onNext(images)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
