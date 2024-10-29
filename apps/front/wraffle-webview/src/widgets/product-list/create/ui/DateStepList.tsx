import {useFormContext} from 'react-hook-form';
import type {CreateEventPayload} from '@/entities/product-form/model';
import {
  AnnounceAtForm,
  EndDateForm,
  StartDateForm,
  WinnerCountForm,
} from '@/entities/product-form/ui';
import {getTypeText} from '@/shared/util';
import {Button, Toaster, Typography} from '@wraffle/ui';

export const DateStep = ({
  type,
  onNext,
}: {
  type: 'raffle' | 'event';
  onNext: (
    startDate: Date,
    endDate: Date,
    announceAt: Date,
    winnerCount: string,
  ) => void;
}) => {
  const eventOrRaffleText = getTypeText(type);

  const {getValues} = useFormContext<CreateEventPayload>();

  const startDate = getValues('startDate');
  const endDate = getValues('endDate');
  const announceAt = getValues('announceAt');
  const winnerCount = getValues('winnerCount');

  const disabled = !startDate || !endDate || !announceAt || !winnerCount;

  return (
    <div className='flex h-full flex-col gap-5 px-5 pb-20'>
      <div className='fixed top-5'>
        <Toaster />
      </div>
      <div>
        <Typography className='text-2xl font-bold'>
          {eventOrRaffleText.dateStep}
        </Typography>
        <Typography className='text-sm font-medium text-[#ADB5BD]'>
          상세 일정을 입력해주세요.
        </Typography>
      </div>

      <div>
        <Typography className='text-xl font-bold'>응모 기간</Typography>
        <StartDateForm />

        <div className='h-2.5'></div>
        <EndDateForm fromDate={startDate} />
      </div>

      <AnnounceAtForm fromDate={endDate} startDate={startDate} />

      <WinnerCountForm />

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          type='button'
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
          disabled={disabled}
          onClick={() => {
            onNext(startDate, endDate, announceAt, winnerCount);
          }}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
