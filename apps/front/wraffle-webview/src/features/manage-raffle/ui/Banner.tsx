'use client';

import type {RecentRaffle} from '../model';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {Typography} from '@wraffle/ui';

interface BannerProps {
  recentRaffle: RecentRaffle;
}

const Banner = ({recentRaffle}: BannerProps) => {
  const {id, title, subTitle, imageUrl, toGoUrl} = recentRaffle;
  const router = useRouter();
  return (
    <div
      className='relative flex min-h-60 justify-center before:absolute before:h-full before:w-full before:bg-black before:opacity-20'
      onClick={() => router.push(toGoUrl)}
    >
      <Image src={imageUrl} alt={`${id} 이미지`} height={375} width={375} />
      <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center'>
        <Typography size='h3' color='white'>
          {title}
        </Typography>
        <Typography size='p4' color='white'>
          {subTitle}
        </Typography>
      </div>
    </div>
  );
};

export {Banner};
