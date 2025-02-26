import {useCallback} from 'react';
import type {Card} from '@/entities/card';
import type {DropResult} from '@hello-pangea/dnd';

const useDragEnd = (
  cardList: Card[],
  setCardList: React.Dispatch<React.SetStateAction<Card[]>>,
  setTargetCard: React.Dispatch<React.SetStateAction<Card | null>>,
  onReorderCard: (
    cardList: Card[],
    startIndex: number,
    endIndex: number,
  ) => Card[],
  onChangeIndex: (sourceIndex: number, destinationIndex: number) => void,
) => {
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const {destination, source} = result;
      if (!destination) return;
      if (source.index === destination.index) return;

      if (destination.index === 0 || source.index === 0) {
        onChangeIndex(source.index, destination.index);
        const newQuotes = onReorderCard(
          cardList,
          source.index,
          destination.index,
        );
        setTargetCard(newQuotes[0]);
        setCardList(newQuotes);
      } else {
        const newQuotes = onReorderCard(
          cardList,
          source.index,
          destination.index,
        );
        setCardList(newQuotes);
      }
    },
    [cardList, onChangeIndex, onReorderCard, setCardList, setTargetCard],
  );
  return onDragEnd;
};

export {useDragEnd};
