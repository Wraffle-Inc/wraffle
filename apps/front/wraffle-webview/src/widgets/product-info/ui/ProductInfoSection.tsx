import React from 'react';
import type {RaffleData, EventData} from '@/entities/product/product';
import {formatDate} from '@/shared/util/formatDate';
import ProductImageList from '@/widgets/product-image-list/ProductImageList';
import {Tag, RaffleCard} from '@wraffle/ui';

type ProductData = RaffleData | EventData;

// 이미지, 타이틀, 가격
export const ProductMainSection: React.FC<{
  productData: ProductData;
  sectionRef: React.RefObject<HTMLDivElement>;
}> = ({productData, sectionRef}) => {
  return (
    <div
      ref={sectionRef}
      className='relative w-full overflow-hidden rounded-lg'
    >
      <ProductImageList images={productData.images} />
      <div className='flex flex-col gap-5 p-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-row items-start gap-2'>
            {productData.tags.map(tag => (
              <Tag key={tag.id}>{tag.name}</Tag>
            ))}
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-xl font-bold'>{productData.title}</p>
            <p className='text-xl font-bold'>
              {productData.price.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 응모 기간
export const ProductApplyPeriodSection: React.FC<{
  productData: ProductData;
  sectionRef: React.RefObject<HTMLDivElement>;
}> = ({productData, sectionRef}) => {
  return (
    <div ref={sectionRef} className='flex flex-col gap-4 p-4'>
      <p className='text-xl font-bold'>응모 기간</p>
      <p className='text-sm text-gray-600'>
        {formatDate(productData.startDate)} ~ {formatDate(productData.endDate)}
      </p>
    </div>
  );
};

// 당첨자 발표
export const ProductAnnouncementSection: React.FC<{
  productData: ProductData;
  sectionRef: React.RefObject<HTMLDivElement>;
}> = ({productData, sectionRef}) => {
  return (
    <div ref={sectionRef} className='flex flex-col gap-4 p-4'>
      <p className='text-xl font-bold'>당첨자 발표</p>
      <p className='text-sm text-gray-600'>
        {formatDate(productData.announceAt)}
      </p>
    </div>
  );
};

// 유의사항
export const ProductNoticeSection: React.FC<{
  productData: ProductData;
  sectionRef: React.RefObject<HTMLDivElement>;
}> = ({productData, sectionRef}) => {
  return (
    <div ref={sectionRef} className='flex flex-col gap-4 p-4'>
      <p className='text-xl font-bold'>유의사항</p>
      <p className='text-sm text-gray-600'>{productData.description}</p>
    </div>
  );
};

// 추첨 상품
export const ProductEventSection: React.FC<{
  productData: EventData;
  sectionRef: React.RefObject<HTMLDivElement>;
}> = ({productData, sectionRef}) => {
  return (
    <div ref={sectionRef} className='flex flex-col gap-4 p-4'>
      <p className='text-xl font-bold'>추첨 상품</p>
      <div className='grid grid-cols-2 gap-4'>
        {productData.products.map(product => (
          <div className='flex justify-center'>
            <RaffleCard
              key={product.id}
              hashtags={product.tags.map(tag => ({
                id: Number(tag.id),
                name: tag.name,
              }))}
              isBookmarked={false}
              name={product.name}
              price={product.price.toLocaleString()}
              scrapCount={3100}
              thumbnailUrl={product.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
