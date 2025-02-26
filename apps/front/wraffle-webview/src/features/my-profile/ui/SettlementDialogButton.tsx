import {usePutSettlementAccount} from '../api/user';
import {BANK_NAME} from '../const';
import {useState} from 'react';
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
  Input,
  Select,
  useToast,
} from '@wraffle/ui';

interface SettlementDialogProps {
  type: string;
  bankName: string;
  bankAccount: string;
}

const SettlementDialogButton = ({
  type,
  bankName,
  bankAccount,
}: SettlementDialogProps) => {
  const {toast} = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const requestPutSettlementAccount = usePutSettlementAccount();

  const [bank, setBankName] = useState('');
  const [account, setBankAccount] = useState('');

  const handleButtonClick = () => {
    setBankName(bankName || '');
    setBankAccount(bankAccount || '');
  };

  const handleSubmit = () => {
    requestPutSettlementAccount(
      {
        bankName: bank,
        bankAccount: account,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          toast({
            title: `정산 계좌가 ${type}되었습니다`,
            duration: 1000,
            variant: 'success',
            icon: 'check',
          });
        },
        onError: (error: Error) => {
          toast({
            title: error.message,
            duration: 2000,
            variant: 'warning',
            icon: 'cross',
          });
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleButtonClick}>정산 계좌 {type}하기</Button>
      </DialogTrigger>

      <form>
        <DialogContent>
          <DialogHeader className='flex flex-col items-center'>
            <DialogTitle>정산 계좌 {type}</DialogTitle>
            <DialogDescription>
              정산 요청용 계좌를 {type}해주세요
            </DialogDescription>
          </DialogHeader>

          <div className='flex gap-2'>
            <Select
              placeholder='은행 선택'
              items={BANK_NAME}
              className='w-3/6'
              defaultValue={bank}
              onValueChange={value => setBankName(value)}
            />
            <Input
              placeholder='정산 계좌 입력하기'
              value={account}
              onChange={e => setBankAccount(e.target.value)}
            />
          </div>

          <DialogFooter className='gap-2'>
            <Button type='button' onClick={handleSubmit}>
              {type}하기
            </Button>
            <DialogClose asChild>
              <Button variant='stroke'>돌아가기</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default SettlementDialogButton;
