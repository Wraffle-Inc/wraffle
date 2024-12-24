'use client';

import {Icon, Input} from '@wraffle/ui';

interface InputWithSearchIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onClick: () => void;
}

export const InputWithSearchIcon = ({
  placeholder,
  onClick,
  ...props
}: InputWithSearchIconProps) => (
  <div className='relative'>
    <Input
      placeholder={placeholder}
      className='border border-solid border-[#F5F5F7] bg-[#FAFAFB] pr-10 text-sm font-medium text-zinc-900 placeholder:text-[#ADB5BD]'
      {...props}
    />
    <button
      type='button'
      onClick={onClick}
      className='absolute inset-y-3 right-0 flex items-center pr-4'
    >
      <Icon name='search' />
    </button>
  </div>
);
