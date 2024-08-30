'use client';

import Image from 'next/image';
import {useState, useEffect} from 'react';
import {Tag} from '@wraffle/ui/src/ui/tag/Tag';

interface ProductData {
  id: number;
  title: string;
  price: number;
  startDate: string;
  endDate: string;
  announceAt: string;
  description: string;
  etc: string;
  thumbnail: string;
  clipCount: number;
  status: string;
  applyCount: number;
  createUserId: number;
  categoryId: number;
  tags: string[];
  images: string[];
}

const sampleData: ProductData = {
  id: 1,
  title: '[Vans] 올드스쿨',
  price: 78000,
  startDate: '2024-07-31 23:20:59',
  endDate: '2024-08-02 23:20:59',
  announceAt: '2024-08-03 23:00:00',
  description:
    '제작 박스로 준비해드립니다. 오후 3시 이전 결제 완료 시 택배 출고 드립니다. 당일 상품 출고 마감 시간 3시입니다.',
  etc: '유의사항',
  thumbnail:
    'https://github.com/user-attachments/assets/73684618-8305-4a78-bcd6-e36342b46c22',
  clipCount: 24,
  status: 'WAITING', // WAITING(추첨 전), APPROVED(당첨), REJECTED(미당첨)
  applyCount: 20,
  createUserId: 1,
  categoryId: 3,
  tags: ['Vans', '래플'],
  images: [
    'https://github.com/user-attachments/assets/73684618-8305-4a78-bcd6-e36342b46c22',
    'https://github.com/user-attachments/assets/4a104905-0106-4b8a-8dcd-06926162e2e6',
  ],
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
}

export default function Product() {
  const [productData, setProductData] = useState<ProductData | null>(null);

  useEffect(() => {
    setProductData(sampleData);
  }, []);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className='relative w-full overflow-hidden rounded-lg'>
        <Image
          src={productData.images[0]}
          alt='Product Images'
          layout='responsive'
          width={1000}
          height={600}
          objectFit='contain'
          className='rounded-lg'
        />
      </div>
      <div className='mb-6 flex flex-col gap-5 p-4'>
        {/* Tag와 Title, Price */}
        <div className='flex flex-col gap-2'>
          <div className='flex flex-row gap-2'>
            {productData.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-xl font-bold'>{productData.title}</p>
            <p className='text-xl font-bold'>
              {productData.price.toLocaleString()}원
            </p>
          </div>
        </div>

        <div className='h-1 w-full bg-[#F9FAFB]' />

        {/* 응모 기간과 날짜 */}
        <div className='flex flex-col gap-4'>
          <p className='text-xl font-bold'>응모 기간</p>
          <p className='text-sm text-gray-600'>
            {formatDate(productData.startDate)} ~{' '}
            {formatDate(productData.endDate)}
          </p>
        </div>

        <div className='h-1 w-full bg-[#F9FAFB]' />

        {/* 당첨자 발표와 날짜 */}
        <div className='flex flex-col gap-4'>
          <p className='text-xl font-bold'>당첨자 발표</p>
          <p className='text-sm text-gray-600'>
            {formatDate(productData.announceAt)}
          </p>
        </div>

        <div className='h-1 w-full bg-[#F9FAFB]' />

        {/* 유의사항과 Description */}
        <div className='flex flex-col gap-4'>
          <p className='text-xl font-bold'>유의사항</p>
          <p className='text-sm text-gray-600'>{productData.description}</p>
        </div>
      </div>
    </main>
  );
}
