'use client';

import {CardItem} from './CardItem';
import {useState} from 'react';
import type {Card} from '@/entities/card';
import DragAndDrop from '@/shared/ui/drag-and-drop/DragAndDrop';
import {useHandleCard} from '@/widgets/card-list/hooks';

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
  const [cards, setCards] = useState<Card[]>(initialCards);
  const {onChangeDefaultCard} = useHandleCard();

  return (
    <DragAndDrop
      itemList={cards}
      listClassName='bg-[#F2F4F6] mb-2'
      itemClassName='bg-white mb-1'
      renderDragItem={item => (
        <CardItem
          key={item.id}
          card={item}
          handleChangeDefaultCard={onChangeDefaultCard}
        />
      )}
      setItemList={setCards}
    />
  );
};

export {CardList};
