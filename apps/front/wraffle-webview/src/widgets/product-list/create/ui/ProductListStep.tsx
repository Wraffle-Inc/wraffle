import type {Product} from 'app/products/create/event/page';
import {ThumbnailCard} from '@/entities/create/ui';
import {Button, Label, Typography} from '@wraffle/ui';

// api 연동
export const ProductListStep = ({
  products,
  onNext,
  onCreate,
}: {
  products: Product[];
  onNext: (products: Product[]) => void;
  onCreate: () => void;
}) => {
  return (
    <div className='flex h-full flex-col px-5 pb-20'>
      <div className='mb-5'>
        <Typography className='text-2xl font-bold'>
          추첨상품을 등록해주세요
        </Typography>
        <Typography className='text-sm font-medium text-[#ADB5BD]'>
          상품은 최대 5개까지 가능해요!
        </Typography>
      </div>

      <div className='mb-4 flex items-end'>
        <Typography className='text-xl font-bold text-zinc-900'>
          추첨상품*
        </Typography>
        <Label className='pb-0.5 text-[0.625rem] font-medium text-zinc-900'>
          최대 5개
        </Label>
      </div>

      <div className='grid w-full max-w-[21rem] grid-cols-2 gap-4 sm:max-w-[55rem] sm:grid-cols-4'>
        {products.map((product, i) => (
          <ThumbnailCard
            key={i}
            url={product.imageUrl}
            title={product.title ?? ''}
          />
        ))}
        {products.length < 5 && (
          <div className='relative flex aspect-square max-h-40 w-full max-w-40 rounded-lg border border-solid border-[#F5F5F7] bg-[#FAFAFB] sm:max-h-52 sm:max-w-52'>
            <div
              className='flex h-full w-full items-center justify-center rounded-lg text-center text-sm font-medium text-[#ADB5BD]'
              onClick={onCreate}
            >
              상품 추가
            </div>
          </div>
        )}
      </div>

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          type='button'
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
          disabled={products.length === 0}
          onClick={() => onNext(products)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
