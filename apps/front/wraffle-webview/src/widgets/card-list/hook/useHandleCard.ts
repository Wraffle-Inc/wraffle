import {useState, useCallback, useEffect} from 'react';
import type {Card} from '@/entities/card';
import {useGETCardListQuery} from '@/features/card/api';

export const useHandleCard = () => {
  const {data: cardList} = useGETCardListQuery();

  const [cards, setCards] = useState<Card[]>(cardList);
  const [targetCard, setTargetCard] = useState<Card | null>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [destinationIndex, setDestinationIndex] = useState(0);

  const handleReorderCard = useCallback(
    (cardList: Card[], startIndex: number, endIndex: number) => {
      const result = Array.from(cardList);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    },
    [],
  );

  const handleCloseDialog = useCallback(() => {
    setTargetCard(null);
  }, []);

  const handleChangeIndex = useCallback(
    (sourceIndex: number, destinationIndex: number) => {
      setSourceIndex(sourceIndex);
      setDestinationIndex(destinationIndex);
    },
    [],
  );

  useEffect(() => {
    if (cardList) {
      setCards(cardList);
    }
  }, [cardList, setCards]);

  return {
    cards,
    targetCard,
    sourceIndex,
    destinationIndex,
    setCards,
    setTargetCard,
    handleReorderCard,
    handleCloseDialog,
    handleChangeIndex,
  };
};
