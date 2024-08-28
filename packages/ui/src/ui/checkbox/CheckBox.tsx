import {Label} from '../form';
import clsx from 'clsx';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import {CheckIcon} from '@radix-ui/react-icons';

interface CheckBoxProps {
  id: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const CheckBox = ({
  id,
  label,
  className,
  disabled,
  checked,
  onCheckedChange,
}: CheckBoxProps) => (
  <div className='flex items-center gap-2'>
    <CheckboxPrimitive.Root
      className={clsx(
        'flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 border-[#D1D5DB]',
        'data-[state=checked]:border-none data-[state=checked]:bg-[#1C2134] data-[state=checked]:text-white',
        'disabled:cursor-not-allowed disabled:bg-[#F1F5F9] disabled:opacity-50',
      )}
      disabled={disabled}
      checked={checked}
      onCheckedChange={onCheckedChange}
      id={id}
    >
      <CheckboxPrimitive.Indicator>
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    <Label htmlFor={id} className={className}>
      {label}
    </Label>
  </div>
);

export default CheckBox;
