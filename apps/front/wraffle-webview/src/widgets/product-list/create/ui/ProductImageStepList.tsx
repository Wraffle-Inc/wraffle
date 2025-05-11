import type {ChangeEvent} from 'react';
import {useRef, useState} from 'react';
import type {UseFormSetValue} from 'react-hook-form';
import type {CreateEventPayload, Product} from '@/entities/product/model';
import {AddItemCard} from '@/features/image-handle/ui/AddItemCard';
import {ImageCardWithDelete} from '@/features/image-handle/ui/ImageCardWithDelete';
import {Button, Typography} from '@wraffle/ui';

export const ProductImageStep = ({
  products,
  title,
  setValue,
  onReturn,
}: {
  products: Product[];
  title: string;
  setValue: UseFormSetValue<CreateEventPayload>;
  onReturn: () => void;
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleDeleteImage = () => {
    setImageFile(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  return (
    <div className='flex h-full flex-col px-5 pb-20'>
      <div className='mb-5'>
        <Typography as='h2' size='h2'>
          추첨상품 이미지가 필요해요!
        </Typography>
        <Typography as='p' size='p3' color='zinc400'>
          추첨 상품 이미지를 추가해주세요!
        </Typography>
      </div>

      <div className='mb-4 flex items-end'>
        <Typography as='h3' size='h3'>
          이미지*
        </Typography>
      </div>

      <input
        type='file'
        ref={imageInputRef}
        className='hidden'
        accept='image/*'
        onChange={onImageChange}
      />

      {imageFile ? (
        <ImageCardWithDelete
          url={URL.createObjectURL(imageFile)}
          onClick={handleDeleteImage}
          className='h-60 w-60'
        />
      ) : (
        <AddItemCard
          label={'이미지 추가'}
          onClick={() => imageInputRef.current?.click()}
          className='h-60 w-60'
        />
      )}

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          type='button'
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
          disabled={!imageFile}
          onClick={() => {
            if (!imageFile) return;
            setValue('products', [
              ...products,
              {title: title, imageUrl: imageFile},
            ]);
            onReturn();
          }}
        >
          추첨 상품 생성하기
        </Button>
      </div>
    </div>
  );
};
