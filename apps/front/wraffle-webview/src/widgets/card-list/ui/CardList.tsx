'use client';

import {CardDialog} from './CardDialog';
import {CardItem} from './CardItem';
import {useHandleCard} from '@/widgets/card-list/hook';
import DragAndDrop from '@/widgets/card-list/ui/CardDragDrop';
import {Typography} from '@wraffle/ui';

const CardList = () => {
  const {
    cards,
    targetCard,
    sourceIndex,
    destinationIndex,
    setCards,
    setTargetCard,
    setSourceIndex,
    setDestinationIndex,
    reorderCard,
    closeDialog,
  } = useHandleCard();

  return (
    <>
      {cards.length === 0 ? (
        <div className='flex h-36 items-center justify-center'>
          <Typography size='p2' color='zinc400'>
            등록된 카드가 없습니다!
          </Typography>
        </div>
      ) : (
        <DragAndDrop
          cardList={cards}
          setTargetCard={setTargetCard}
          setSourceIndex={setSourceIndex}
          setDestinationIndex={setDestinationIndex}
          setCardList={setCards}
          reorderCard={reorderCard}
          renderDragItem={(item, dragHandleProps) => (
            <CardItem
              key={item.id}
              card={item}
              dragHandleProps={dragHandleProps}
            />
          )}
        />
      )}
      {targetCard && (
        <CardDialog
          isOpen={targetCard !== null}
          targetCard={targetCard}
          cards={cards}
          sourceIndex={sourceIndex}
          destinationIndex={destinationIndex}
          setCards={setCards}
          closeDialog={closeDialog}
          reorderCard={reorderCard}
        />
      )}
    </>
  );
};

export {CardList};
