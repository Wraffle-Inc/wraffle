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
  const [bank, setBankName] = useState(bankName || '');
  const [account, setBankAccount] = useState(bankAccount || '');

  console.log('bank', bank);
  console.log('account', account);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>정산 계좌 {type}하기</Button>
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
            <Button>{type}하기</Button>
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
