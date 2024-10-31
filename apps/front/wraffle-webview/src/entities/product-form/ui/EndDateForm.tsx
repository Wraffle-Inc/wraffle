import type {CreateEventPayload} from '../model';
import {useFormContext} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {CalendarForm, useToast} from '@wraffle/ui';

export const EndDateForm = ({
  defaultValue,
  fromDate: startDate,
}: {
  defaultValue: Date;
  fromDate: Date;
}) => {
  const {control} = useFormContext<CreateEventPayload>();
  const {toast} = useToast();
  return (
    <FormField
      control={control}
      name='endDate'
      render={({field}) => (
        <FormItem>
          <FormLabel className='text-base'>응모 마감 일정*</FormLabel>
          <FormControl>
            <CalendarForm
              dateLabel='응모 마감 시간을 입력해주세요.'
              selected={defaultValue}
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
  );
};
