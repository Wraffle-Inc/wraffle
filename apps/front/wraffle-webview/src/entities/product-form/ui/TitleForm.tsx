'use client';

import type {CreateEventPayload} from '../model';
import {useFormContext} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {titleLimit} from '@/shared/util';
import {Input} from '@wraffle/ui';

export const TitleForm = ({
  defaultValue,
  placeholder,
}: {
  defaultValue: string;
  placeholder: string;
}) => {
  const {control} = useFormContext<CreateEventPayload>();
  return (
    <FormField
      control={control}
      name='title'
      render={({field}) => (
        <FormItem>
          <FormLabel htmlFor='title' className='text-xl font-bold'>
            제목*
          </FormLabel>
          <FormControl>
            <Input
              className='border-[#F5F5F7] bg-[#FAFAFB] placeholder:text-[#ADB5BD]'
              id='title'
              type='text'
              maxLength={titleLimit}
              placeholder={placeholder}
              value={defaultValue}
              onChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
