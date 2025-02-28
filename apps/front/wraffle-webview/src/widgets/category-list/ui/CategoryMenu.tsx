import type {CategoryItem} from '@/entities/category/type';

type CategoryMenuProps = {
  categories: CategoryItem[];
  selectedCategory: number | null;
  onSelectCategory: (categories: CategoryItem) => void;
};

export const CategoryMenu = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryMenuProps) => {
  return (
    <nav className='my-2 flex h-[34px] w-full items-center gap-5 overflow-x-auto whitespace-nowrap px-5 scrollbar-hide'>
      {categories.map(category => (
        <div
          key={category.id}
          onClick={() => onSelectCategory(category)}
          className={`relative cursor-pointer px-1 text-sm font-semibold ${
            selectedCategory === category.id ? 'text-black' : 'text-[#8D95A1]'
          }`}
        >
          {category.name}
        </div>
      ))}
    </nav>
  );
};
