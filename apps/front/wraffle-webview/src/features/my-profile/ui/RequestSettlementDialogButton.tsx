import {useInput} from '@/shared/hook';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  InputField,
} from '@wraffle/ui';

interface RequestSettlementDialogButtonProps {
  availableAmount: number;
}

const RequestSettlementDialogButton = ({
  availableAmount,
}: RequestSettlementDialogButtonProps) => {
  const [amount, handleAmount, setAmount] = useInput('');

  const handleButtonClick = () => {
    setAmount('');
  };

  const onSubmit = () => {
    console.log('submit', amount);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={handleButtonClick}>정산 요청하기</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className='flex flex-col items-center'>
          <DialogTitle>정산 요청하기</DialogTitle>
          <DialogDescription>
            정산은 10,000원 단위로만 요청이 가능해요!
          </DialogDescription>
        </DialogHeader>

        <div className='gap-2'>
          <InputField>
            <InputField.Label htmlFor='availableAmount'>
              정산가능 금액
            </InputField.Label>
            <InputField.Input
              value={`${availableAmount.toLocaleString()}원`}
              disabled
            />
          </InputField>

          <InputField>
            <InputField.Label htmlFor='requestAmount'>
              정산 요청 금액
            </InputField.Label>
            <InputField.Input
              placeholder='요청 금액(원) 입력하기'
              value={amount}
              onChange={handleAmount}
            />
            <InputField.ErrorMessage isError></InputField.ErrorMessage>
          </InputField>
        </div>

        <DialogFooter className='gap-2'>
          <Button type='button' onClick={onSubmit}>
            요청하기
          </Button>
          <DialogClose asChild>
            <Button variant='stroke'>돌아가기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestSettlementDialogButton;
