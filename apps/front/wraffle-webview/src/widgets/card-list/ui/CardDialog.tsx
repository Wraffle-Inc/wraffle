import type {Card} from '@/entities/card';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@wraffle/ui';

interface CardDialogProps {
  isOpen: boolean;
  targetCard: Card;
  cards: Card[];
  sourceIndex: number;
  destinationIndex: number;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  closeDialog: () => void;
  reorderCard: (
    cardList: Card[],
    startIndex: number,
    endIndex: number,
  ) => Card[];
}

const CardDialog = ({
  isOpen,
  targetCard,
  cards,
  sourceIndex,
  destinationIndex,
  setCards,
  closeDialog,
  reorderCard,
}: CardDialogProps) => {
  const onChangeCard = () => {
    // !TODO: 카드 순서 변경 mutataion
    setCards(cards =>
      cards.map((card, index) =>
        index === 0 ? {...card, isDefault: true} : {...card, isDefault: false},
      ),
    );
    closeDialog();
  };

  const onCancleChangeCard = () => {
    const newOrderedCardList = reorderCard(
      cards,
      destinationIndex,
      sourceIndex,
    ).map((card, index) =>
      index === 0 ? {...card, isDefault: true} : {...card, isDefault: false},
    );
    setCards(newOrderedCardList);
    closeDialog();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent onInteractOutside={e => e.preventDefault()}>
        <DialogHeader className='flex flex-col items-center'>
          <DialogTitle>주 사용 카드 변경</DialogTitle>
          <div className='mt-3 h-12 w-20 rounded bg-orange-400' />
          <DialogDescription>
            기본 결제 카드가{' '}
            <strong>
              {targetCard.cardCode} {targetCard.cardNumber.split(' ')[3]}
            </strong>
            로 변경돼요!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='gap-1'>
          <Button onClick={onChangeCard}>변경하기</Button>
          <Button variant='stroke' onClick={onCancleChangeCard}>
            돌아가기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export {CardDialog};
