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
      className='flex w-full items-center justify-between border-b border-gray-300 p-4'
      onClick={() => router.push(`/category/${category.id}`)}
    >
      <Typography size='h4' className='text-left font-normal'>
        {category.name}
      </Typography>
      <Icon name='arrow-right-2' height={14} width={14} className='ml-auto' />
    </button>
  );
};

export {CategoryPageButton};
