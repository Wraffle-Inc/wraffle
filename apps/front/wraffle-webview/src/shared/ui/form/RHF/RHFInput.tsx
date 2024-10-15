import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './core/Form';
import type {HTMLInputTypeAttribute} from 'react';
import {useFormContext} from 'react-hook-form';
import {Input} from '@wraffle/ui';

export interface RHFInputProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: HTMLInputTypeAttribute;
}

const RHFInput = ({
  name,
  label,
  placeholder,
  description,
  type,
}: RHFInputProps) => {
  const {control} = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          <div className='mb-2'>
            <FormLabel className='text-[#333D4B]'>{label}</FormLabel>
          </div>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className='mt-1 min-h-6' />
        </FormItem>
      )}
    />
  );
};

export {RHFInput};
