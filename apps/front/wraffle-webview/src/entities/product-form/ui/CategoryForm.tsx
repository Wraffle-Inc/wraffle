import type {CreateEventPayload} from '../model';
import {useFormContext} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {Select} from '@wraffle/ui';

export const CategoryForm = ({
  categoryItems,
}: {
  categoryItems: {
    value: string;
    name: string;
  }[];
}) => {
  const {control} = useFormContext<CreateEventPayload>();
  return (
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
};
