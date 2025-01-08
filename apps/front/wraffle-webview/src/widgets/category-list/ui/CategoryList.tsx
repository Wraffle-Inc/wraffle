import type {CategoryItem} from '@/entities/category/type';
import {CategoryPageButton} from '@/features/get-category/ui';

interface CategoryButtonsProps {
  categories: CategoryItem[];
}

const CategoryList = ({categories}: CategoryButtonsProps) => {
  return (
    <div className='mx-auto w-full max-w-screen-md overflow-x-auto'>
      {categories.map(category => (
        <CategoryPageButton key={category.id} category={category} />
      ))}
    </div>
  );
};

export {CategoryList};
