'use client';

import {useRouter} from 'next/navigation';
import {useEffect, useState, useRef} from 'react';
import {sampleProductData} from '@/entities/product/product';
import type {ProductData} from '@/entities/product/product';
import ParticipateButton from '@/features/participate/ParticipateButton';
import {useMenu} from '@/features/product-menu/useMenu';
import ShareModal from '@/features/share-product-link/ShareModal';
import {Header} from '@/shared/ui';
import {
  ProductInfoMenu,
  ProductMainSection,
  ProductApplyPeriodSection,
  ProductAnnouncementSection,
  ProductNoticeSection,
} from '@/widgets/product-info';
import {Icon} from '@wraffle/ui';

const ProductPage = () => {
  const router = useRouter();
  const {selectedMenu, selectMenu} = useMenu('상품');
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <div className='flex min-h-screen flex-col'>
      <div className='sticky top-0 z-20 bg-white'>
        <Header>
          <Header.Left>
            <Header.BackButton onClick={router.back} />
          </Header.Left>
          <Header.Right>
            <div className='flex w-full justify-end'>
              <Icon name='upload' onClick={openShareModal} />
            </div>
          </Header.Right>
        </Header>
        <ProductInfoMenu
          selectedMenu={selectedMenu}
          onSelectMenu={selectMenu}
        />
      </div>

      {/* 메인 컨텐츠 */}
      <main className='flex-1 overflow-y-auto'>
        <ProductMainSection
          productData={productData}
          sectionRef={sectionsRef.current['상품']}
        />
        <div className='h-1 w-full bg-[#F9FAFB]' />
        <ProductApplyPeriodSection
          productData={productData}
          sectionRef={sectionsRef.current['응모 기간']}
        />
        <div className='h-1 w-full bg-[#F9FAFB]' />
        <ProductAnnouncementSection
          productData={productData}
          sectionRef={sectionsRef.current['당첨자 발표']}
        />
        <div className='h-1 w-full bg-[#F9FAFB]' />
        <ProductNoticeSection
          productData={productData}
          sectionRef={sectionsRef.current['유의사항']}
        />
      </main>

      {/* 하단 고정 Participate 버튼 */}
      <div className='sticky bottom-0 z-20 bg-[#F9FAFB] p-4'>
        <ParticipateButton
          status={productData.status}
          clipCount={productData.clipCount}
          applyStatus={productData.applyStatus}
          productImage={productData.images[0]}
        />
      </div>

      <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
    </div>
  );
};

export default ProductPage;
