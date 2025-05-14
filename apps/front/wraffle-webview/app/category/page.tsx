'use client';

import {useSearchParams} from 'next/navigation';
import {useEffect, useState, Suspense} from 'react';
import type {CategoryItem} from '@/entities/category';
import {getCategories} from '@/entities/category/';
import {Header} from '@/shared/ui';
import {CategoryList} from '@/widgets/category-list';
import {CategoryMenu} from '@/widgets/category-list';
import {getSubCategories} from '@/widgets/category-list';
import {BottomNavigation, Icon, Typography} from '@wraffle/ui';
import {RaffleCard} from '@wraffle/ui';

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get('view');
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [subCategories, setSubCategories] = useState<CategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const currentCategory = categoryName
    ? categories.find(category => category.name === categoryName)
    : null;

  // ✅ 상위 카테고리 조회
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch (err) {
        console.error('카테고리 조회 실패:', err);
      }
    };
    fetchCategories();
  }, []);

  // ✅ 하위 카테고리 조회 (상위 카테고리 선택 시)
  useEffect(() => {
    const fetchSub = async () => {
      if (!currentCategory) return;

      try {
        const sub = await getSubCategories(currentCategory.id);
        setSubCategories([
          {
            id: 0,
            name: '전체',
            parentId: currentCategory.id,
            depth: 2,
          },
          ...sub,
        ]);
        setSelectedCategory(0);
      } catch (err) {
        console.error('하위 카테고리 조회 실패:', err);
      }
    };

    fetchSub();
  }, [currentCategory]);

  // 필터링된 상품 목록
  const filteredProducts =
    selectedCategory === 0
      ? subCategories.filter(product =>
          subCategories.some(c => c.id === product.id),
        )
      : subCategories.filter(product => product.id === selectedCategory);

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
            categories={subCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </section>
      ) : (
        <section className='flex justify-center'>
          <CategoryList categories={categories} />
        </section>
      )}

      <section className='p-4'>
        <div
          className='grid justify-center gap-[20px]'
          style={{gridTemplateColumns: 'repeat(auto-fit, 160px)'}}
        >
          <Suspense fallback={<Typography size='h5'>로딩 중...</Typography>} />
          {/* {filteredProducts.length > 0 &&
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
          )} */}
        </div>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default CategoryPage;
