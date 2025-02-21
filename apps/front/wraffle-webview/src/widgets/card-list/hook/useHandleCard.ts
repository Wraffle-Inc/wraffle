import {useState, useCallback} from 'react';
import type {Card} from '@/entities/card';

interface Props {
  initialCards: Card[];
}

export const useHandleCard = ({initialCards}: Props) => {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [targetCard, setTargetCard] = useState<Card | null>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [destinationIndex, setDestinationIndex] = useState(0);

  const reorderCard = useCallback(
    (cardList: Card[], startIndex: number, endIndex: number) => {
      const result = Array.from(cardList);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    },
    [],
  );

  const closeDialog = useCallback(() => {
    setTargetCard(null);
  }, []);

  return {
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
  };
};
