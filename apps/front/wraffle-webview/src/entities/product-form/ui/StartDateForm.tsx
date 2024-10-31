import type {CreateEventPayload} from '../model';
import {useFormContext} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {CalendarForm} from '@wraffle/ui';

export const StartDateForm = ({defaultValue}: {defaultValue: Date}) => {
  const {control} = useFormContext<CreateEventPayload>();
  return (
    <FormField
      control={control}
      name='startDate'
      render={({field}) => (
        <FormItem>
          <FormLabel className='text-base'>응모 시작 일정*</FormLabel>
          <FormControl>
            <CalendarForm
              dateLabel='응모 시작 시간을 입력해주세요.'
              selected={defaultValue}
              setSelected={field.onChange}
              fromDate={new Date()}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
