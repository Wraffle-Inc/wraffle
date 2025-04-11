import {useRouter} from 'next/navigation';
import React, {type MutableRefObject, type RefObject} from 'react';
import type {RaffleData, EventData} from '@/entities/product/product';
import ProductImageList from '@/widgets/product-image-list/ProductImageList';
import {Tag, RaffleCard, Icon} from '@wraffle/ui';

type ProductData = RaffleData | EventData;

// 이미지, 타이틀, 가격
export const ProductMainSection = ({
  productData,
  sectionRef,
  isCreator,
}: {
  productData: ProductData;
  sectionRef: React.RefObject<HTMLDivElement>;
  isCreator: boolean;
}) => {
  const router = useRouter();

  return (
    <div
      ref={sectionRef}
      className='relative w-full overflow-hidden rounded-lg'
    >
      <ProductImageList images={productData.images} />
      <div className='flex flex-col gap-5 p-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-row items-start justify-between gap-2'>
            <div className='flex flex-row gap-2'>
              {productData.tags?.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)}
            </div>
            <button
              onClick={() =>
                router.push(
                  `${productData.id}/edit?type=${'raffle' in productData ? 'raffle' : 'event'}`,
                )
              }
            >
              {isCreator ? (
                <Icon name='write' className='ml-auto' width={18} height={18} />
              ) : null}
            </button>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-xl font-bold'>{productData.title}</p>
            <p className='text-xl font-bold'>
              {isCreator
                ? `총 ${productData.applyCount}명 응모`
                : `${productData.price.toLocaleString()}원`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 공용으로 사용되는 상품 정보 섹션
export const ProductInfoSection = ({
  label,
  data,
  sectionsRef,
}: {
  label: string;
  data: string;
  sectionsRef: MutableRefObject<{
    [key: string]: RefObject<HTMLDivElement>;
  }>;
}) => {
  return (
    <div ref={sectionsRef.current[label]} className='flex flex-col gap-4 p-4'>
      <p className='text-xl font-bold'>{label}</p>
      <p className='text-sm text-gray-600'>{data}</p>
    </div>
  );
};

// 추첨 상품
export const ProductEventSection = ({
  productData,
  sectionRef,
}: {
  productData: EventData;
  sectionRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div ref={sectionRef} className='flex flex-col gap-4 p-4'>
      <p className='text-xl font-bold'>추첨 상품</p>
      <div
        className='grid justify-center gap-[20px]'
        style={{
          gridTemplateColumns: 'repeat(auto-fit, 160px)',
        }}
      >
        {productData.products.map(product => (
          <RaffleCard
            key={product.id}
            name={product.name}
            thumbnailUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};
