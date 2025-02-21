'use client';

import {CardDialog} from './CardDialog';
import {CardItem} from './CardItem';
import type {Card} from '@/entities/card';
import {useHandleCard} from '@/widgets/card-list/hook';
import DragAndDrop from '@/widgets/card-list/ui/CardDragDrop';

const initialCards: Card[] = [
  {
    id: 1,
    cardCode: '국민',
    cardNumber: '**** **** **** 0123',
    cardIndex: 1,
    isDefault: true,
  },
  {
    id: 2,
    cardCode: '신한',
    cardNumber: '**** **** **** 4567',
    cardIndex: 2,
    isDefault: false,
  },
  {
    id: 3,
    cardCode: '농협',
    cardNumber: '**** **** **** 8910',
    cardIndex: 3,
    isDefault: false,
  },
];

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
  } = useHandleCard({initialCards});

  return (
    <>
      <DragAndDrop
        cardList={cards}
        setTargetCard={setTargetCard}
        setSourceIndex={setSourceIndex}
        setDestinationIndex={setDestinationIndex}
        setCardList={setCards}
        reorderCard={reorderCard}
        renderDragItem={item => <CardItem key={item.id} card={item} />}
      />
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
