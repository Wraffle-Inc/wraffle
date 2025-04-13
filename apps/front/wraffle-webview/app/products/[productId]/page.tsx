'use client';

import {useRouter, useParams, useSearchParams} from 'next/navigation';
import {useEffect, useState, useRef} from 'react';
import type {EventData, RaffleData} from '@/entities/product/product';
import ParticipateButton from '@/features/participate/ui/ParticipateButton';
import {getProductDetailServer} from '@/features/product-detail/api/getProductDetailServer';
import ShareDialog from '@/features/share-product-link/ShareDialog';
import {Header, Divider} from '@/shared/ui';
import {formatDate} from '@/shared/util/formatDate';
import {
  ProductInfoMenu,
  ProductMainSection,
  ProductInfoSection,
} from '@/widgets/product-info';
import {RAFFLE_MENUS, EVENT_MENUS} from '@/widgets/product-info/config/const';
import {
  type RaffleMenu,
  type EventMenu,
} from '@/widgets/product-info/config/const';
import {useMenu} from '@/widgets/product-info/hook/useMenu';
import {ProductEventSection} from '@/widgets/product-info/ui/ProductInfoSection';

const HEADER_OFFSET = 115;

const ProductPage = () => {
  const router = useRouter();
  const {productId} = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as 'raffle' | 'event';

  console.log('id', productId);
  console.log('type', type);

  const [productData, setProductData] = useState<RaffleData | EventData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  // ✅ 유효성 검사
  const numericId = Number(productId);
  const isValidtype = type === 'raffle' || type === 'event';

  useEffect(() => {
    if (!numericId || isNaN(numericId)) {
      router.push('/404');
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getProductDetailServer({id: numericId, type});
        setProductData(data);
      } catch (error) {
        console.error('상품 조회 실패:', error);

        if ((error as Error).message.includes('Unauthorized')) {
          router.push('/login');
        } else if ((error as Error).message.includes('Not Found')) {
          router.push('/404');
        } else {
          // 기타 에러
          alert('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [numericId, type, router, isValidtype]);

  const {selectedMenu, selectMenu} = useMenu('상품' as RaffleMenu | EventMenu);

  const sectionsRef = useRef<{
    [key: string]: React.RefObject<HTMLDivElement>;
  }>({
    상품: useRef<HTMLDivElement>(null),
    '응모 기간': useRef<HTMLDivElement>(null),
    '당첨자 발표': useRef<HTMLDivElement>(null),
    '추첨 상품': useRef<HTMLDivElement>(null),
    유의사항: useRef<HTMLDivElement>(null),
  });

  if (isLoading || !productData) {
    return <div>Loading...</div>;
  }

  const menus = type === 'event' ? [...EVENT_MENUS] : [...RAFFLE_MENUS];

  // 메뉴 선택 시 스크롤 이동 함수
  const scrollToSection = (menu: RaffleMenu | EventMenu) => {
    const section = sectionsRef.current[menu];
    if (section && section.current) {
      window.scrollTo({
        top: section.current.offsetTop - HEADER_OFFSET,
        behavior: 'smooth',
      });
    }
  };

  // 메뉴 클릭 시 메뉴를 선택하고 해당 섹션으로 스크롤 이동
  const handleMenuSelect = (menu: RaffleMenu | EventMenu) => {
    selectMenu(menu);
    scrollToSection(menu);
  };

  return (
    <div className='flex min-h-screen flex-col'>
      <div className='sticky top-0 z-20 bg-white'>
        <Header>
          <Header.Left>
            <Header.BackButton />
          </Header.Left>
          <Header.Right>
            <ShareDialog />
          </Header.Right>
        </Header>
        <ProductInfoMenu
          menus={menus}
          selectedMenu={selectedMenu}
          onSelectMenu={handleMenuSelect}
        />
      </div>

      <main className='mb-[80px] flex-1 overflow-y-auto'>
        <ProductMainSection
          productData={productData}
          sectionRef={sectionsRef.current['상품']}
          isCreator={productData.isCreator}
        />
        <Divider />
        <ProductInfoSection
          label='응모 기간'
          data={`${formatDate(productData.startDate)} ~ ${formatDate(productData.endDate)}`}
          sectionsRef={sectionsRef}
        />
        <Divider />
        <ProductInfoSection
          label='당첨자 수'
          data={`${productData.winnerCount}명`}
          sectionsRef={sectionsRef}
        />
        <Divider />
        <ProductInfoSection
          label='당첨자 발표'
          data={formatDate(productData.announceAt)}
          sectionsRef={sectionsRef}
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
        <ProductInfoSection
          label='유의사항'
          data={productData.description}
          sectionsRef={sectionsRef}
        />
      </main>

      <div className='sticky bottom-0 z-20 bg-[#F9FAFB] p-4'>
        <ParticipateButton
          status={productData.status}
          clipCount={productData.clipCount}
          isApplied={productData.isApplied}
          productImage={productData.images[0]}
          isCreator={productData.isCreator}
          productId={productData.id}
          productType={type.toUpperCase() as 'RAFFLE' | 'EVENT'}
          isClipped={productData.isClipped}
          clippingId={productData.clippingId}
        />
      </div>
    </div>
  );
};

export default ProductPage;
