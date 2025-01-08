import Image from 'next/image';
import Link from 'next/link';
import {Typography} from '@wraffle/ui';

interface NotificationItemProps {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
}

export const NotificationItem = ({
  id,
  title,
  description,
  date,
  imageUrl,
}: NotificationItemProps) => {
  return (
    <Link
      href={`/notification/${id}`}
      className='flex min-h-[70px] w-full flex-row items-center justify-between gap-[10px] px-5 py-1'
    >
      <div className='flex w-full flex-col justify-between'>
        <div className='flex flex-col items-start'>
          <Typography
            className='line-clamp-1 text-ellipsis text-[16px] text-[#212121]'
            color='zinc800'
          >
            {title}
          </Typography>
          <Typography
            className='line-clamp-3 text-ellipsis'
            size='p2'
            color='zinc500'
          >
            {description}
          </Typography>
        </div>
        <Typography className='text-[10px] text-[#BDBDBD]'>{date}</Typography>
      </div>

      {!!imageUrl && (
        <div className='relative h-[60px] w-[60px]'>
          <Image
            className='rounded-md'
            src={imageUrl}
            alt='notification-item-image'
            fill
            sizes='(max-width: 768px) 60px, (max-width: 1200px) 60px, 60px'
          />
        </div>
      )}
    </Link>
  );
};
