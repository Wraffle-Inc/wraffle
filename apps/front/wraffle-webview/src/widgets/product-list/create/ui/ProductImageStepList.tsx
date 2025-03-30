import {useState, useRef} from 'react';
import type {UseFormSetValue} from 'react-hook-form';
import type {CreateEventPayload, Product} from '@/entities/product/model';
import {uploadImage} from '@/features/image-handle/api/imageUpload';
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
  const [imageUrl, setImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const uploadedImageUrl = await uploadImage(file);
      setImageUrl(uploadedImageUrl);
    } catch (error) {
      console.error('이미지 업로드 중 오류가 발생했습니다:', error);
    }
  };

  const handleDeleteImage = () => {
    setImageUrl('');
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
        ref={fileInputRef}
        className='hidden'
        accept='image/*'
        onChange={handleImageUpload}
      />

      {imageUrl ? (
        <ImageCardWithDelete
          url={imageUrl}
          onClick={handleDeleteImage}
          className='h-60 w-60'
        />
      ) : (
        <AddItemCard
          label={'이미지 추가'}
          onClick={() => fileInputRef.current?.click()}
          className='h-60 w-60'
        />
      )}

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          type='button'
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
          disabled={!imageUrl}
          onClick={() => {
            const updatedProducts = [
              ...products,
              {title: title, tagIds: [], imageUrl: imageUrl},
            ];
            setValue('products', updatedProducts);
            onReturn();
          }}
        >
          추첨 상품 생성하기
        </Button>
      </div>
    </div>
  );
};
