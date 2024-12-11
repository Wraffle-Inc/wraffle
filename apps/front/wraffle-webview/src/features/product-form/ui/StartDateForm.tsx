'use client';

import type {CreateEventPayload} from '../../../entities/product/model';
import {STARTDATE_IS_OVER_ENDDATE} from '../config/const';
import {validateAndChangeDate} from '../config/validateAndChangeDate';
import {useFormContext} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {CalendarForm, useToast} from '@wraffle/ui';

export const StartDateForm = ({
  defaultValue,
  referenceDate: endDate,
}: {
  defaultValue: Date | undefined;
  referenceDate: Date | undefined;
}) => {
  const {control} = useFormContext<CreateEventPayload>();
  const {toast} = useToast();
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
              onSelect={date =>
                validateAndChangeDate({
                  date,
                  referenceDate: endDate,
                  onChange: field.onChange,
                  toastInfo: STARTDATE_IS_OVER_ENDDATE,
                  toast,
                })
              }
              fromDate={new Date()}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
