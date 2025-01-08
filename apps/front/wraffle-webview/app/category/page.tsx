'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {categories} from '@/entities/category';
import {Header} from '@/shared/ui';
import {CategoryList} from '@/widgets/category-list/ui';
import {BottomNavigation, Icon, Typography} from '@wraffle/ui';

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryName = searchParams.get('view');

  // 상위 카테고리 찾기
  const currentCategory = categoryName
    ? categories.find(category => category.name === categoryName) // 상위 카테고리를 찾음
    : null; // 이미 상위 카테고리인 경우

  // 상위 카테고리가 존재하면 해당하는 하위 카테고리 필터링
  const filteredCategories = currentCategory
    ? categories.filter(category => category.parentId === currentCategory?.id) // 하위 카테고리 필터링
    : categories.filter(category => category.parentId === null); // 상위 카테고리 필터링

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
        <section className='mb-4 flex justify-center'>
          <CategoryList categories={filteredCategories} />
        </section>
      ) : (
        <section className='mb-4 flex justify-center'>
          <CategoryList categories={filteredCategories} />
        </section>
      )}
      <BottomNavigation />
    </div>
  );
};

export default CategoryPage;
