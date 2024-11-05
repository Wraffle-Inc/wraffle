'use client';

import {useEffect} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import type {CreateEventPayload} from '@/entities/product/model';
import {
  AnnounceAtForm,
  EndDateForm,
  StartDateForm,
  WinnerCountForm,
} from '@/features/product-form/ui';
import {getTypeText} from '@/shared/util';
import {Button, Toaster, Typography, useToast} from '@wraffle/ui';

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

  const {setValue} = useFormContext<CreateEventPayload>();

  const [startDate, endDate, announceAt, winnerCount] = useWatch({
    name: ['startDate', 'endDate', 'announceAt', 'winnerCount'],
  });

  const {toast} = useToast();

  const disabled = !startDate || !endDate || !announceAt || !winnerCount;

  useEffect(() => {
    if (endDate < startDate) {
      setValue('endDate', startDate);
      toast({
        title: '응모 마감 일정은',
        description: '응모 시작 일정 이후로 설정해주세요.',
        duration: 10000,
        variant: 'warning',
      });
    }

    if (announceAt < endDate) {
      setValue('announceAt', endDate);
      toast({
        title: '당첨자 발표 일정은',
        description: '응모 마감 일정 이후로 설정해주세요.',
        duration: 10000,
        variant: 'warning',
      });
    }
  }, [startDate, endDate, announceAt]);

  return (
    <div className='flex h-full flex-col gap-5 px-5 pb-20'>
      <div className='fixed top-5'>
        <Toaster />
      </div>
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
        <StartDateForm defaultValue={startDate} />

        <div className='h-2.5'></div>
        <EndDateForm defaultValue={endDate} fromDate={startDate} />
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
