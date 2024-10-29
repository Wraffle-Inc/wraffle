import type {CreateEventPayload} from '../model';
import type {Control} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {Select} from '@wraffle/ui';

export const CategoryForm = ({
  control,
  categoryItems,
}: {
  control: Control<CreateEventPayload>;
  categoryItems: {
    value: string;
    name: string;
  }[];
}) => (
  <FormField
    control={control}
    name='categoryId'
    render={({field}) => (
      <FormItem>
        <FormLabel className='text-xl font-bold'>카테고리*</FormLabel>
        <FormControl>
          <Select
            className='border-[#F5F5F7] bg-[#FAFAFB]'
            placeholder='카테고리를 선택해주세요.'
            items={categoryItems}
            onValueChange={field.onChange}
            defaultValue={field.value}
          />
        </FormControl>
      </FormItem>
    )}
  />
);
