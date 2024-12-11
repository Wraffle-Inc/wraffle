'use client';

import clsx from 'clsx';
import Image from 'next/image';

interface ImageCardWithDeleteProps {
  url: string;
  onClick: () => void;
  className: string;
}

export const ImageCardWithDelete = ({
  url,
  onClick,
  className,
}: ImageCardWithDeleteProps) => (
  <div
    className={clsx(
      'relative flex-none overflow-hidden rounded-lg bg-slate-100',
      className,
    )}
  >
    <button type='button' className='absolute right-2 top-2' onClick={onClick}>
      <Image src={'/icons/ic_close.svg'} alt='close' width={12} height={12} />
    </button>
    <Image
      alt='thumbnail'
      width={160}
      height={160}
      src={url}
      className='h-full w-full object-cover'
    />
  </div>
);
