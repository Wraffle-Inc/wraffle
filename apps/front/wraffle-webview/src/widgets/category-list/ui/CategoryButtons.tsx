import type {CategoryItem} from '@/entities/category/type';
import {CategoryButton} from '@/features/get-category/ui';

interface CategoryButtonsProps {
  categories: CategoryItem[];
}

const CategoryButtons = ({categories}: CategoryButtonsProps) => {
  return (
    <div className='grid max-w-screen-md grid-cols-[auto_1fr] content-center overflow-x-auto p-4'>
      <div className='grid cursor-pointer grid-flow-col grid-rows-[auto_auto] gap-x-6 gap-y-4'>
        {categories.map(category => (
          <CategoryButton key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export {CategoryButtons};
