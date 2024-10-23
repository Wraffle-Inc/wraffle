import {useFormContext} from 'react-hook-form';
import type {CreateEventPayload} from '@/entities/create/model/createEventSchema';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {getTypeText, handleMaxLength, winnerLimit} from '@/shared/util';
import {
  Button,
  CalendarForm,
  Input,
  Toaster,
  Typography,
  useToast,
} from '@wraffle/ui';

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
  const {toast} = useToast();

  const {getValues, control} = useFormContext<CreateEventPayload>();

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
        <FormField
          control={control}
          name='startDate'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-base'>응모 시작 일정*</FormLabel>
              <FormControl>
                <CalendarForm
                  dateLabel='응모 시작 시간을 입력해주세요.'
                  selected={field.value}
                  setSelected={field.onChange}
                  fromDate={new Date()}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='h-2.5'></div>
        <FormField
          control={control}
          name='endDate'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-base'>응모 마감 일정*</FormLabel>
              <FormControl>
                <CalendarForm
                  dateLabel='응모 마감 시간을 입력해주세요.'
                  selected={field.value}
                  setSelected={field.onChange}
                  fromDate={startDate}
                  onClick={e => {
                    if (!startDate) {
                      e.preventDefault();
                      e.stopPropagation();
                      toast({
                        title: '응모 시작 일정 먼저 선택해주세요',
                        duration: 2000,
                        variant: 'info',
                      });
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name='announceAt'
        render={({field}) => (
          <FormItem>
            <FormLabel className='text-xl font-bold'>
              당첨자 발표 일정*
            </FormLabel>
            <FormControl>
              <CalendarForm
                dateLabel='당첨자 발표 시간을 입력해주세요.'
                selected={field.value}
                setSelected={field.onChange}
                fromDate={endDate}
                onClick={e => {
                  if (!startDate || !endDate) {
                    e.preventDefault();
                    e.stopPropagation();
                    const title = !startDate
                      ? '응모 시작 일정을 먼저 선택해주세요'
                      : '응모 마감 일정을 먼저 선택해주세요';
                    toast({
                      title: title,
                      duration: 2000,
                      variant: 'info',
                    });
                  }
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='winnerCount'
        render={({field}) => (
          <FormItem>
            <FormLabel htmlFor='winnerCount' className='text-xl font-bold'>
              당첨자 수*
            </FormLabel>
            <FormControl>
              <Input
                className='border-[#F5F5F7] bg-[#FAFAFB] pr-10 placeholder:text-[#ADB5BD]'
                id='winnerCount'
                type='number'
                inputMode='numeric'
                maxLength={winnerLimit}
                onInput={handleMaxLength}
                placeholder='담첨자 수를 입력해주세요. (최대 100명)'
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

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
