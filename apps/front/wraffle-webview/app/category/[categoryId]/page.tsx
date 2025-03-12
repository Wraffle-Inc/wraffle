'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {categories} from '@/entities/category';
import {Header} from '@/shared/ui';
import {CategoryList} from '@/widgets/category-list/ui';
import {BottomNavigation, Icon, Typography} from '@wraffle/ui';

const CategoryDetailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryName = searchParams.get('view');

  // 현재 상위 카테고리 찾기
  const currentUpperCategory = categories.find(
    category => category.name === categoryName,
  );

  // 해당하는 하위 카테고리 필터링
  const filteredCategories = categories.filter(
    category => category.parentId === currentUpperCategory?.id,
  );

  return (
    <div className='h-auto pb-16'>
      <Header withUnderline>
        <Header.Left>
          <Header.BackButton />
        </Header.Left>
        <Header.Right>
          <Icon name='shopping-box' />
        </Header.Right>
      </Header>
      <section className='mb-4 flex justify-center'>
        {filteredCategories.length > 0 ? (
          <CategoryList categories={filteredCategories} />
        ) : (
          <Typography size='h6'>하위 카테고리가 존재하지 않습니다.</Typography>
        )}
      </section>

      <BottomNavigation />
    </div>
  );
};

export default CategoryDetailPage;
