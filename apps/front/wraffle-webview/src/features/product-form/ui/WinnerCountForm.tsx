'use client';

import type {CreateEventPayload} from '../../../entities/product/model';
import {useFormContext} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {handleMaxLength, WINNER_LIMIT} from '@/shared/util';
import {Input} from '@wraffle/ui';

export const WinnerCountForm = ({defaultValue}: {defaultValue: string}) => {
  const {control} = useFormContext<CreateEventPayload>();
  return (
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
              maxLength={WINNER_LIMIT}
              onInput={handleMaxLength}
              placeholder='담첨자 수를 입력해주세요. (최대 100명)'
              value={defaultValue}
              onChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
