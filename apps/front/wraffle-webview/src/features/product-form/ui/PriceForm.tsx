'use client';

import type {CreateEventPayload} from '../../../entities/product/model';
import {useFormContext} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {priceLimit} from '@/shared/util';
import {Input} from '@wraffle/ui';

export const PriceForm = ({
  label,
  placeholder,
  defaultValue,
}: {
  label: string;
  placeholder: string;
  defaultValue: string;
}) => {
  const {control} = useFormContext<CreateEventPayload>();
  return (
    <FormField
      control={control}
      name='price'
      render={({field}) => (
        <FormItem>
          <FormLabel htmlFor='price' className='text-xl font-bold'>
            {label}
          </FormLabel>
          <FormControl>
            <div className='relative w-full'>
              <Input
                className='border-[#F5F5F7] bg-[#FAFAFB] pr-10 placeholder:text-[#ADB5BD]'
                id='price'
                type='text'
                inputMode='numeric'
                maxLength={priceLimit}
                placeholder={placeholder}
                value={
                  field.value
                    ? Number(field.value).toLocaleString()
                    : defaultValue
                }
                onChange={e => {
                  const value = e.target.value.replace(/,/g, '');
                  if (!isNaN(Number(value))) {
                    field.onChange(value);
                  }
                }}
                ref={field.ref}
                onBlur={field.onBlur}
              />
              <div className='absolute inset-y-3 right-0 flex items-center pr-4'>
                <span className='text-xl font-bold text-zinc-900'>원</span>
              </div>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
