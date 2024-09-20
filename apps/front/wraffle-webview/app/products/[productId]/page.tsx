'use client';

import {useRouter} from 'next/navigation';
import {useEffect, useState, useRef} from 'react';
import {sampleProductData} from '@/entities/product/product';
import type {ProductData} from '@/entities/product/product';
import ParticipateButton from '@/features/participate/ParticipateButton';
import {useMenu} from '@/features/product-menu/useMenu';
import {Header} from '@/shared/ui';
import ProductImageList from '@/widgets/product-image-list/ProductImageList';
import ProductInfoMenu from '@/widgets/product-info/ProductInfoMenu';
import {Tag, Icon} from '@wraffle/ui';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
};

const ProductPage = () => {
  const router = useRouter();
  const {selectedMenu, selectMenu} = useMenu('상품');
  const [productData, setProductData] = useState<ProductData | null>(null);
  const sectionsRef = useRef({
    상품: useRef<HTMLDivElement>(null),
    '응모 기간': useRef<HTMLDivElement>(null),
    '당첨자 발표': useRef<HTMLDivElement>(null),
    유의사항: useRef<HTMLDivElement>(null),
  });

  useEffect(() => {
    setProductData(sampleProductData);
  }, []);

  useEffect(() => {
    const section = sectionsRef.current[selectedMenu];
    if (section && section.current) {
      const headerOffset = 115;
      window.scrollTo({
        top: section.current.offsetTop - headerOffset,
        behavior: 'smooth',
      });
    }
  }, [selectedMenu]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='sticky top-0 z-50 bg-white'>
        <Header>
          <Header.Left>
            <Header.BackButton onClick={router.back} />
          </Header.Left>
          <Header.Right>
            <div className='flex w-full justify-end'>
              <Icon name='upload' />
            </div>
          </Header.Right>
        </Header>
        <ProductInfoMenu
          selectedMenu={selectedMenu}
          onSelectMenu={selectMenu}
        />
      </div>

      <main>
        <div
          ref={sectionsRef.current['상품']}
          className='relative z-10 w-full overflow-hidden rounded-lg'
        >
          <ProductImageList images={productData.images} />
          <div className='flex flex-col gap-5 p-4'>
            {/* Tag와 Title, Price */}
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

        <div className='h-1 w-full bg-[#F9FAFB]' />

        <div
          ref={sectionsRef.current['응모 기간']}
          className='flex flex-col gap-4 p-4'
        >
          <p className='text-xl font-bold'>응모 기간</p>
          <p className='text-sm text-gray-600'>
            {formatDate(productData.startDate)} ~{' '}
            {formatDate(productData.endDate)}
          </p>
        </div>

        <div className='h-1 w-full bg-[#F9FAFB]' />

        <div
          ref={sectionsRef.current['당첨자 발표']}
          className='flex flex-col gap-4 p-4'
        >
          <p className='text-xl font-bold'>당첨자 발표</p>
          <p className='text-sm text-gray-600'>
            {formatDate(productData.announceAt)}
          </p>
        </div>

        <div className='h-1 w-full bg-[#F9FAFB]' />

        <div
          ref={sectionsRef.current['유의사항']}
          className='flex flex-col gap-4 p-4'
        >
          <p className='text-xl font-bold'>유의사항</p>
          <p className='text-sm text-gray-600'>{productData.description}</p>
        </div>
      </main>

      <div className='sticky bottom-0 z-50 w-full bg-[#F9FAFB]'>
        <ParticipateButton
          status={productData.status}
          clipCount={productData.clipCount}
        />
      </div>
    </>
  );
};
export default ProductPage;
