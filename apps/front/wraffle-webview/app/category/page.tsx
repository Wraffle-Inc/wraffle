import {categories} from '@/entities/category';
import {Header} from '@/shared/ui';
import {CategoryList} from '@/widgets/category-list/ui';
import {BottomNavigation, Icon, Typography} from '@wraffle/ui';

const CategoryPage = () => {
  return (
    <div className='h-auto pb-16'>
      <Header withUnderline>
        <Header.Left>
          <Header.BackButton />
        </Header.Left>
        <Header.Middle>
          <Typography size='h6'>카테고리</Typography>
        </Header.Middle>
        <Header.Right>
          <Icon name='bell' />
        </Header.Right>
      </Header>
      <section className='mb-4 flex justify-center'>
        <CategoryList categories={categories} />
      </section>
      <BottomNavigation />
    </div>
  );
};

export default CategoryPage;
