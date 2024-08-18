import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { Label } from '../form';

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
        'shrink-0 w-4 h-4 rounded border-2 border-[#D1D5DB] flex items-center justify-center',
        'data-[state=checked]:bg-[#1C2134] data-[state=checked]:border-none data-[state=checked]:text-white',
        'disabled:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-50'
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
