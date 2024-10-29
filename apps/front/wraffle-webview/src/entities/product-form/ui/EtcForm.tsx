import type {CreateEventPayload} from '../model';
import type {Control} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {etcLimit} from '@/shared/util';

export const EtcForm = ({control}: {control: Control<CreateEventPayload>}) => (
  <FormField
    control={control}
    name='etc'
    render={({field}) => (
      <FormItem>
        <FormLabel htmlFor='etc' className='text-xl font-bold text-[#18181B]'>
          유의사항*
          <span className='text-[0.625rem] font-medium'>최대 400자</span>
        </FormLabel>
        <FormControl>
          <textarea
            id='etc'
            className='w-full resize-none rounded-lg border border-solid border-[#F5F5F7] bg-[#FAFAFB] p-3 text-sm font-medium placeholder:text-[#ADB5BD]'
            rows={7}
            maxLength={etcLimit}
            placeholder='유의사항을 작성해주세요'
            {...field}
          />
        </FormControl>
      </FormItem>
    )}
  />
);
