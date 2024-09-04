import {Typography} from '../typography/Typography';
import {VisibleTags} from './VisibleTags';
import {type TagType} from './use-hiddenTag';
import {Icon} from '@wds/ui/icon/Icon';

export interface RaffleCardProps {
  name: string;
  price: string;
  hashtags: TagType[];
  scrapCount: number;
  thumbnailUrl: string;
  endDate?: string;
  isBookmarked: boolean;
}

const RaffleCard = ({
  name,
  price,
  hashtags,
  scrapCount,
  thumbnailUrl,
  endDate,
  isBookmarked,
}: RaffleCardProps) => {
  const isClosed = (endDate && new Date(endDate) < new Date()) || false;

  return (
    <div className='h-[267px] w-[160px]'>
      <div className='relative mb-2 flex h-[160px] w-full items-center justify-center rounded-sm backdrop-brightness-90'>
        <img
          src={thumbnailUrl}
          alt={name}
          className='h-full w-full rounded-sm'
        />
        {isClosed && (
          <div className='absolute z-10 flex h-full w-full items-center justify-center rounded-sm bg-black bg-opacity-40'>
            <Typography className='text-white' fontWeight='bold'>
              마감되었어요 🫠
            </Typography>
          </div>
        )}
      </div>
      <Typography className='truncate' fontSize='p2' fontWeight='semibold'>
        {name}
      </Typography>
      <Typography
        className='mb-2 text-gray-600'
        fontSize='sm2'
        fontWeight='semibold'
      >
        {price}원
      </Typography>
      <VisibleTags hashtags={hashtags} letterSpace={20} />
      <span className='flex items-center justify-start gap-0.5'>
        {isBookmarked && <Icon name='bookmark' fill='black' />}
        {!isBookmarked && <Icon name='bookmark' />}
        <Typography className='text-[11px]' fontWeight='semibold'>
          {scrapCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Typography>
      </span>
    </div>
  );
};

export {RaffleCard};
