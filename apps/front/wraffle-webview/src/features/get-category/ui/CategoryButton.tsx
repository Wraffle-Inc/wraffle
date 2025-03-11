'use client';

import {useRouter} from 'next/navigation';
import type {CategoryItem} from '@/entities/category';
import {Typography} from '@wraffle/ui';

interface CategoryButtonProps {
  category: CategoryItem;
}

const CategoryButton = ({category}: CategoryButtonProps) => {
  const router = useRouter();

  const goCategory = () => {
    router.push(`/category/${category.id}`);
  };

  return (
    <button
      className='h-[74px] w-[72px] rounded-full border border-[#F4F4F5] bg-[#FAFAFA] px-2 py-3'
      onClick={goCategory}
    >
      <Typography size='p2' className='break-keep text-center'>
        {category.name}
      </Typography>
    </button>
  );
};

export {CategoryButton};
