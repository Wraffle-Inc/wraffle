'use client';

import {useFormContext, useWatch} from 'react-hook-form';
import type {CreateEventPayload} from '@/entities/product/model';
import {
  AnnounceAtForm,
  EndDateForm,
  StartDateForm,
  WinnerCountForm,
} from '@/features/product-form/ui';
import {getTypeText} from '@/shared/util';
import {Button, Typography, useToast} from '@wraffle/ui';

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

  const {control} = useFormContext<CreateEventPayload>();

  const [startDate, endDate, announceAt, winnerCount] = useWatch({
    control,
    name: ['startDate', 'endDate', 'announceAt', 'winnerCount'],
  });

  const disabled = !startDate || !endDate || !announceAt || !winnerCount;

  return (
    <div className='flex h-full flex-col gap-5 px-5 pb-20'>
      <div>
        <Typography as='h2' size='h2'>
          {eventOrRaffleText.dateStep}
        </Typography>
        <Typography as='p' size='p3' color='zinc400'>
          상세 일정을 입력해주세요.
        </Typography>
      </div>

      <div>
        <Typography as='h3' size='h3'>
          응모 기간
        </Typography>
        <StartDateForm defaultValue={startDate} referenceDate={endDate} />

        <div className='h-2.5'></div>
        <EndDateForm
          defaultValue={endDate}
          fromDate={startDate}
          referenceDate={announceAt}
        />
      </div>

      <AnnounceAtForm
        defaultValue={announceAt}
        fromDate={endDate}
        startDate={startDate}
      />

      <WinnerCountForm defaultValue={winnerCount} />

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
