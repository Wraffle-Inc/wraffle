import type {ChangeEvent} from 'react';
import {useRef} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import type {CreateEventPayload} from '@/entities/product/model';
import {AddItemCard, ImageCardWithDelete} from '@/features/image-handle';
import {Button, Label, Typography} from '@wraffle/ui';

export const ImageStep = ({onNext}: {onNext: (images: File[]) => void}) => {
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const {control, setValue} = useFormContext<CreateEventPayload>();

  const [images] = useWatch({
    control,
    name: ['images'],
  });

  const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);
    setValue('images', [...images, ...files]);
    if (imagesInputRef.current) {
      imagesInputRef.current.value = '';
    }
  };

  const handleImageDelete = (index: number) => {
    setValue(
      'images',
      images.filter((_, i) => i !== index),
    );
    if (imagesInputRef.current) {
      imagesInputRef.current.value = '';
    }
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
        ref={imagesInputRef}
        className='hidden'
        accept='image/*'
        onChange={onImagesChange}
        multiple
      />

      <div className='flex flex-wrap gap-4'>
        {images.map((file, index) => (
          <ImageCardWithDelete
            key={`${file.name}-${index}`}
            url={URL.createObjectURL(file)}
            onClick={() => handleImageDelete(index)}
            className='h-40 w-40'
          />
        ))}
        {images.length < 4 && (
          <AddItemCard
            label='이미지 추가'
            onClick={() => imagesInputRef.current?.click()}
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
