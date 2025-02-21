import type {Card} from '@/entities/card';
import {ColorLabel, Typography} from '@wraffle/ui';

interface CardItemProps {
  card: Card;
}

const CardItem = ({card}: CardItemProps) => {
  return (
    <div className='w-full py-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center gap-2'>
          <div className='h-12 w-20 rounded bg-orange-400' />
          <span className='flex items-center gap-2'>
            <Typography size='p4' className='font-bold'>
              {card.cardCode}
            </Typography>
            <Typography size='p4'>{card.cardNumber}</Typography>
          </span>
        </div>
        {card.isDefault && <ColorLabel>주사용 카드</ColorLabel>}
      </div>
    </div>
  );
};

export {CardItem};
