'use client';

import {useRouter} from 'next/navigation';
import type {CategoryItem} from '@/entities/category';
import {Icon, Typography} from '@wraffle/ui';

interface CategoryButtonProps {
  category: CategoryItem;
}

const CategoryPageButton = ({category}: CategoryButtonProps) => {
  const router = useRouter();
  return (
    <button
      className='flex w-full items-center justify-between border-b border-[#F2F4F6] px-6 py-4'
      onClick={() => router.push(`/category?view=${category.name}`)}
    >
      <Typography size='h5' className='text-left font-normal'>
        {category.name}
      </Typography>
      <Icon name='arrow-right-2' height={14} width={14} className='ml-auto' />
    </button>
  );
};

export {CategoryPageButton};
