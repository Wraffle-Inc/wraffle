import type {CreateEventPayload} from '../model';
import type {Control} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {titleLimit} from '@/shared/util';
import {Input} from '@wraffle/ui';

export const TitleForm = ({
  control,
  placeholder,
}: {
  control: Control<CreateEventPayload>;
  placeholder: string;
}) => (
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
            {...field}
          />
        </FormControl>
      </FormItem>
    )}
  />
);
