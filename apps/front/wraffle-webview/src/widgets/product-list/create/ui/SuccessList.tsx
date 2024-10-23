import Image from 'next/image';
import Link from 'next/link';
import {getTypeText} from '@/shared/util';
import {Button, Typography} from '@wraffle/ui';

export const SuccessList = ({
  type,
  productId,
  thumbnail,
}: {
  type: 'raffle' | 'event';
  productId: string;
  thumbnail: string;
}) => {
  const eventOrRaffleText = getTypeText(type);

  return (
    <div className='flex h-full flex-col items-center px-4 py-6'>
      <div className='mb-24 w-full text-left'>
        <Typography className='text-2xl font-bold'>
          {eventOrRaffleText.successWithoutReview}
        </Typography>

        <Typography className='text-sm font-medium'>
          지금 바로 확인해보러 갈까요?
        </Typography>
      </div>

      <Image
        src={thumbnail}
        width={250}
        height={250}
        alt='thumbnail-image'
        className='h-60 w-60 rounded-lg bg-blue-200 object-cover'
      />

      <div className='fixed inset-x-0 bottom-0 px-4 py-4'>
        <Link href={`/products/${productId}?type=${type}`}>
          <Button className='h-[45px]'>
            {eventOrRaffleText.successWithoutReviewButton}
          </Button>
        </Link>
      </div>
    </div>
  );
};
