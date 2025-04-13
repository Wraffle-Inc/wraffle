import Image from 'next/image';
import Link from 'next/link';
import {getTypeText} from '@/shared/util/typeUtils';
import {Button, Typography} from '@wraffle/ui';

interface SuccessProps {
  searchParams: {
    id: string;
    thumbnail: string;
    type: 'event' | 'raffle';
  };
}

const Success = ({searchParams: {id, thumbnail, type}}: SuccessProps) => {
  const eventOrRaffleText = getTypeText(type);
  const imageUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${thumbnail}`;

  return (
    <div className='flex h-full flex-col items-center px-4 py-6'>
      <div className='mb-24 w-full text-left'>
        <Typography as='h2' size='h2'>
          {eventOrRaffleText.successWithoutReview}
        </Typography>

        <Typography as='p' size='p3' color='zinc400'>
          지금 바로 확인해보러 갈까요?
        </Typography>
      </div>

      <Image
        src={imageUrl}
        width={250}
        height={250}
        alt='thumbnail-image'
        className='h-60 w-60 rounded-lg object-cover'
      />

      <div className='fixed inset-x-0 bottom-0 px-4 py-4'>
        <Link href={`/products/${id}?type=${type}`} replace={true}>
          <Button className='h-[45px]'>
            {eventOrRaffleText.successWithoutReviewButton}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
