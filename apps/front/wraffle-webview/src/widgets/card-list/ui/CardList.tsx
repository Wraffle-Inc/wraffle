'use client';

import {CardDialog} from './CardDialog';
import {CardDragDrop} from './CardDragDrop';
import {CardItem} from './CardItem';
import {useHandleCard} from '@/widgets/card-list/hook';
import {Typography} from '@wraffle/ui';

const CardList = () => {
  const {
    cards,
    targetCard,
    sourceIndex,
    destinationIndex,
    setCards,
    setTargetCard,
    handleReorderCard,
    handleCloseDialog,
    handleChangeIndex,
  } = useHandleCard();

  return (
    <>
      {!cards.length && (
        <div className='flex h-36 items-center justify-center'>
          <Typography size='p2' color='zinc400'>
            등록된 카드가 없습니다!
          </Typography>
        </div>
      )}
      {!!cards.length && (
        <CardDragDrop
          cardList={cards}
          setTargetCard={setTargetCard}
          setCardList={setCards}
          onReorderCard={handleReorderCard}
          onChangeIndex={handleChangeIndex}
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
          onCloseDialog={handleCloseDialog}
          onReorderCard={handleReorderCard}
        />
      )}
    </>
  );
};

export {CardList};
