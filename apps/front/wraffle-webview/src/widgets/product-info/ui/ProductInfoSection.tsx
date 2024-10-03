import React from 'react';
import type {ProductData} from '@/entities/product/product';
import {formatDate} from '@/shared/util/formatDate';
import ProductImageList from '@/widgets/product-image-list/ProductImageList';
import {Tag} from '@wraffle/ui';

// ProductMainSection
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

// ProductApplyPeriodSection
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

// ProductAnnouncementSection
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

// ProductNoticeSection
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
