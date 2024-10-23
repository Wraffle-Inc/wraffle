import Image from 'next/image';
import {Typography} from '@wraffle/ui';

export const ThumbnailCard = ({title, url}: {title?: string; url: string}) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='relative aspect-square max-h-40 w-full max-w-40 overflow-hidden rounded-lg bg-center sm:max-h-52 sm:max-w-52'>
        <button
          type='button'
          className='absolute right-2 top-2'
          onClick={() => {}}
        >
          <Image
            src={'/icons/ic_close.svg'}
            alt='close'
            width={12}
            height={12}
          />
        </button>
        <Image
          alt='thumbnail'
          width={160}
          height={160}
          src={url}
          className='h-full w-full object-cover'
        />
      </div>
      <Typography className='text-sm font-semibold text-zinc-900'>
        {title}
      </Typography>
    </div>
  );
};
