import type {CreateEventPayload} from '../model';
import type {Control} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {CalendarForm} from '@wraffle/ui';

export const StartDateForm = ({
  control,
}: {
  control: Control<CreateEventPayload>;
}) => (
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
);
