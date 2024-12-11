'use client';

import type {CreateEventPayload} from '../../../entities/product/model';
import {
  ENDDATE_IS_OVER_ANNOUNCEAT,
  STARTDATE_IS_UNDEFINED,
} from '../config/const';
import {validateAndChangeDate} from '../config/validateAndChangeDate.ts';
import {useFormContext} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {CalendarForm, useToast} from '@wraffle/ui';

export const EndDateForm = ({
  defaultValue,
  fromDate: startDate,
  referenceDate: announceAt,
}: {
  defaultValue: Date | undefined;
  fromDate: Date;
  referenceDate: Date | undefined;
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
              onSelect={date =>
                validateAndChangeDate({
                  date,
                  referenceDate: announceAt,
                  onChange: field.onChange,
                  toastInfo: ENDDATE_IS_OVER_ANNOUNCEAT,
                  toast,
                })
              }
              fromDate={startDate}
              onClick={e => {
                if (!startDate) {
                  e.preventDefault();
                  e.stopPropagation();
                  toast(STARTDATE_IS_UNDEFINED);
                }
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
