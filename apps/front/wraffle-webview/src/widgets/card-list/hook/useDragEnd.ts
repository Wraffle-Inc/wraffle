import {useCallback} from 'react';
import type {Card} from '@/entities/card';
import type {DropResult} from '@hello-pangea/dnd';

const useDragEnd = (
  cardList: Card[],
  setCardList: React.Dispatch<React.SetStateAction<Card[]>>,
  setTargetCard: React.Dispatch<React.SetStateAction<Card | null>>,
  setSourceIndex: React.Dispatch<React.SetStateAction<number>>,
  setDestinationIndex: React.Dispatch<React.SetStateAction<number>>,
  reorderCard: (
    cardList: Card[],
    startIndex: number,
    endIndex: number,
  ) => Card[],
) => {
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const {destination, source} = result;
      if (!destination) return;
      if (source.index === destination.index) return;

      if (destination.index === 0 || source.index === 0) {
        setSourceIndex(source.index);
        setDestinationIndex(destination.index);
        const newQuotes = reorderCard(
          cardList,
          source.index,
          destination.index,
        );
        setTargetCard(newQuotes[0]);
        setCardList(newQuotes);
      } else {
        const newQuotes = reorderCard(
          cardList,
          source.index,
          destination.index,
        );
        setCardList(newQuotes);
      }
    },
    [
      cardList,
      reorderCard,
      setCardList,
      setDestinationIndex,
      setSourceIndex,
      setTargetCard,
    ],
  );
  return onDragEnd;
};

export {useDragEnd};
