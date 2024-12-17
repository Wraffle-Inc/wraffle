'use client';

import type {CreateEventPayload} from '../../../entities/product/model';
import {useFormContext} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {CalendarForm} from '@wraffle/ui';

export const StartDateForm = ({
  defaultValue,
  onSelect,
}: {
  defaultValue: Date | undefined;
  onSelect: (
    date: Date | undefined,
    onChange: (date: Date | undefined) => void,
  ) => void;
}) => {
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
              onSelect={date => onSelect(date, field.onChange)}
              fromDate={new Date()}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
