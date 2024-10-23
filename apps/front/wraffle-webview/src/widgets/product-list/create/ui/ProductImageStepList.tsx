import type {Product} from 'app/products/create/event/page';
import type {UseFormSetValue} from 'react-hook-form';
import type {CreateEventPayload} from '@/entities/create/model';
import {Button, Typography} from '@wraffle/ui';

// TODO
// image api 연동
// 이미지 추가 부분은 api연동하며 구현하겠습니다
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
  const imageUrl = '';

  return (
    <div className='flex h-full flex-col px-5 pb-20'>
      <div className='mb-5'>
        <Typography className='text-2xl font-bold'>
          추첨상품 이미지가 필요해요!
        </Typography>
        <Typography className='text-sm font-medium text-[#ADB5BD]'>
          추첨 상품 이미지를 추가해주세요!
        </Typography>
      </div>

      <div className='mb-4 flex items-end'>
        <Typography className='text-xl font-bold text-zinc-900'>
          이미지*
        </Typography>
      </div>

      <div className='flex h-60 w-60 items-center justify-center rounded-lg border border-solid border-[#F5F5F7] bg-[#FAFAFB]'>
        <span className='text-center text-sm font-medium text-[#ADB5BD]'>
          이미지 추가
        </span>
      </div>

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          type='button'
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
          // disabled={!imageUrl}
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
