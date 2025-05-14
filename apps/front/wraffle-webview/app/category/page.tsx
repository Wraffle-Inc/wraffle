'use client';

import {useSearchParams} from 'next/navigation';
import {useEffect, useState, Suspense} from 'react';
import type {CategoryItem} from '@/entities/category';
import {getCategories} from '@/entities/category/';
import {Header} from '@/shared/ui';
import {CategoryList} from '@/widgets/category-list/ui';
import {CategoryMenu} from '@/widgets/category-list/ui';
import {BottomNavigation, Icon, Typography} from '@wraffle/ui';
import {RaffleCard} from '@wraffle/ui';

const sampleProducts = [
  {
    id: 2,
    name: '이거 삼성 상품임',
    price: 10000,
    thumbnailUrl:
      'https://github.com/user-attachments/assets/4a104905-0106-4b8a-8dcd-06926162e2e6',
    scrapCount: 89,
    isBookmarked: false,
    categoryId: 18,
    hashtags: [{id: 8, name: '사진'}],
  },
  {
    id: 3,
    name: '최신형 무선 이어버드 래플',
    price: 3000,
    thumbnailUrl:
      'https://github.com/user-attachments/assets/4a104905-0106-4b8a-8dcd-06926162e2e6',
    scrapCount: 75,
    isBookmarked: false,
    categoryId: 17,
    hashtags: [{id: 50, name: '엔터테인먼트'}],
  },
  {
    id: 4,
    name: '다목적 스마트워치 래플',
    price: 7000,
    thumbnailUrl:
      'https://github.com/user-attachments/assets/4a104905-0106-4b8a-8dcd-06926162e2e6',
    scrapCount: 50,
    isBookmarked: false,
    categoryId: 17,
    hashtags: [{id: 70, name: '지속가능성'}],
  },
  {
    id: 1,
    name: '한정판 레트로 스니커즈 래플',
    price: 5000,
    thumbnailUrl:
      'https://github.com/user-attachments/assets/4a104905-0106-4b8a-8dcd-06926162e2e6',
    scrapCount: 120,
    isBookmarked: true,
    categoryId: 17,
    hashtags: [{id: 34, name: '웨어러블'}],
  },
  {
    id: 5,
    name: '에코 전동 스쿠터 래플',
    price: 15000,
    thumbnailUrl:
      'https://github.com/user-attachments/assets/4a104905-0106-4b8a-8dcd-06926162e2e6',
    scrapCount: 65,
    isBookmarked: false,
    categoryId: 17,
    hashtags: [{id: 63, name: '친환경'}],
  },
];

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get('view');
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const currentCategory = categoryName
    ? categories.find(category => category.name === categoryName)
    : null;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories(); // 서버에서 상위 카테고리만 반환
        setCategories(res);
        if (categoryName) setSelectedCategory(0);
      } catch (err) {
        console.error('카테고리 조회 실패:', err);
      }
    };

    fetchCategories();
  }, [categoryName]);

  // 전체/개별 카테고리 렌더링용 리스트
  const menuCategories = [
    {
      id: 0,
      name: '전체',
      parentId: currentCategory?.id ?? null,
      depth: 0,
    },
    ...categories,
  ];

  const filteredProducts =
    selectedCategory === 0
      ? sampleProducts.filter(product =>
          categories.some(c => c.id === product.categoryId),
        )
      : sampleProducts.filter(
          product => product.categoryId === selectedCategory,
        );

  const handleSelectCategory = (category: CategoryItem) => {
    setSelectedCategory(category.id);
  };

  return (
    <div className='h-auto pb-16'>
      <Header withUnderline>
        <Header.Left>
          <Header.BackButton />
        </Header.Left>
        <Header.Middle>
          <Typography size='h6'>
            {currentCategory ? null : '카테고리'}
          </Typography>
        </Header.Middle>
        <Header.Right>
          <Icon name={currentCategory ? 'shopping-box' : 'bell'} />
        </Header.Right>
      </Header>

      {currentCategory ? (
        <section className='flex flex-col justify-center'>
          <Header withUnderline>
            <Header.Middle>
              <Typography size='h4'>{currentCategory.name}</Typography>
            </Header.Middle>
          </Header>
          <CategoryMenu
            categories={menuCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </section>
      ) : (
        <section className='flex justify-center'>
          <CategoryList categories={menuCategories} />
        </section>
      )}

      <section className='p-4'>
        <div
          className='grid justify-center gap-[20px]'
          style={{gridTemplateColumns: 'repeat(auto-fit, 160px)'}}
        >
          <Suspense fallback={<Typography size='h5'>로딩 중...</Typography>} />
          {filteredProducts.length > 0 &&
            filteredProducts.map(product => (
              <RaffleCard
                key={product.id}
                name={product.name}
                thumbnailUrl={product.thumbnailUrl}
                price={product.price.toString()}
                scrapCount={product.scrapCount}
                isBookmarked={product.isBookmarked}
                hashtags={product.hashtags}
              />
            ))}
          {filteredProducts.length === 0 && (
            <Typography size='h5' className='text-gray-500'>
              상품 추가 예정입니다.
            </Typography>
          )}
        </div>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default CategoryPage;
