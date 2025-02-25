import type {Card} from '@/entities/card';
import type {DraggableProvidedDragHandleProps} from '@hello-pangea/dnd';
import {ColorLabel, Icon, Typography} from '@wraffle/ui';

interface CardItemProps {
  card: Card;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
}

const CardItem = ({card, dragHandleProps}: CardItemProps) => {
  return (
    <div className='w-full py-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center'>
          <div {...dragHandleProps}>
            <Icon name='drag' color='#A3A3A3' />
          </div>
          <div className='flex items-center gap-2'>
            <div className='aspect-[1.58/1] w-16 rounded bg-orange-400' />
            <span className='flex items-center gap-2'>
              <Typography size='p4' className='font-bold'>
                {card.cardCode}
              </Typography>
              <Typography size='p4'>{card.cardNumber}</Typography>
            </span>
          </div>
        </div>
        {card.isDefault && <ColorLabel>주사용 카드</ColorLabel>}
      </div>
    </div>
  );
};

export {CardItem};
