'use client';

import {useRouter} from 'next/navigation';
import {Icon} from '@wraffle/ui/src/ui/icon/Icon';

interface BackButtonProps {
  onClick?: () => void;
}

export const BackButton = ({onClick}: BackButtonProps) => {
  const router = useRouter();
  const onClickBackButton = () => {
    if (onClick) {
      onClick();
      return;
    }
    router.back();
  };
  return (
    <button
      onClick={onClickBackButton}
      className='flex items-center justify-center text-black'
    >
      <Icon name='arrow-left' />
    </button>
  );
};
