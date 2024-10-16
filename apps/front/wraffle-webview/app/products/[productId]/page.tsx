'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState, useRef} from 'react';
import {sampleRaffleData, sampleEventData} from '@/entities/product/product';
import type {RaffleData, EventData} from '@/entities/product/product';
import ParticipateButton from '@/features/participate/ParticipateButton';
import {useMenu} from '@/features/product-menu/useMenu';
import ShareModal from '@/features/share-product-link/ShareModal';
import {Header, Divider} from '@/shared/ui';
import {
  ProductInfoMenu,
  ProductMainSection,
  ProductApplyPeriodSection,
  ProductAnnouncementSection,
  ProductNoticeSection,
} from '@/widgets/product-info';
import {ProductEventSection} from '@/widgets/product-info/ui/ProductInfoSection';
import {Icon} from '@wraffle/ui';

const ProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const {selectedMenu, selectMenu} = useMenu('상품');
  const [productData, setProductData] = useState<RaffleData | EventData | null>(
    null,
  );
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const sectionsRef = useRef<{
    [key: string]: React.RefObject<HTMLDivElement>;
  }>({
    상품: useRef<HTMLDivElement>(null),
    '응모 기간': useRef<HTMLDivElement>(null),
    '당첨자 발표': useRef<HTMLDivElement>(null),
    '추첨 상품': useRef<HTMLDivElement>(null),
    유의사항: useRef<HTMLDivElement>(null),
  });

  // 타입에 따라 메뉴 리스트를 정의
  const menus =
    type === 'event'
      ? ['상품', '응모 기간', '당첨자 발표', '추첨 상품', '유의사항']
      : ['상품', '응모 기간', '당첨자 발표', '유의사항'];

  useEffect(() => {
    // 쿼리스트링의 타입에 따라 데이터 로드
    if (type === 'raffle') {
      setProductData(sampleRaffleData);
    } else if (type === 'event') {
      setProductData(sampleEventData);
    } else {
      router.push('/404');
    }
  }, [type]);

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
          menus={menus}
          selectedMenu={selectedMenu}
          onSelectMenu={selectMenu}
        />
      </div>

      <main className='mb-[80px] flex-1 overflow-y-auto'>
        <ProductMainSection
          productData={productData}
          sectionRef={sectionsRef.current['상품']}
        />
        <Divider />
        <ProductApplyPeriodSection
          productData={productData}
          sectionRef={sectionsRef.current['응모 기간']}
        />
        <Divider />
        <ProductAnnouncementSection
          productData={productData}
          sectionRef={sectionsRef.current['당첨자 발표']}
        />
        <Divider />
        {type === 'event' && (
          <>
            <ProductEventSection
              productData={productData as EventData}
              sectionRef={sectionsRef.current['추첨 상품']}
            />
            <Divider />
          </>
        )}
        <ProductNoticeSection
          productData={productData}
          sectionRef={sectionsRef.current['유의사항']}
        />
      </main>

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
