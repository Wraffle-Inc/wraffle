import type {CreateEventPayload} from '../model';
import type {Control} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {CalendarForm, useToast} from '@wraffle/ui';

export const AnnounceAtForm = ({
  control,
  fromDate: endDate,
  startDate,
}: {
  control: Control<CreateEventPayload>;
  fromDate: Date;
  startDate: Date;
}) => {
  const {toast} = useToast();
  return (
    <FormField
      control={control}
      name='announceAt'
      render={({field}) => (
        <FormItem>
          <FormLabel className='text-xl font-bold'>당첨자 발표 일정*</FormLabel>
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
  );
};
