import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

interface CheckBoxProps {
  label?: string;
  labelClassName?: string;
  disabled?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const CheckBox = ({
  label,
  labelClassName,
  disabled,
  checked,
  onCheckedChange,
}: CheckBoxProps) => (
  <label className={clsx('flex items-center gap-2', labelClassName)}>
    <CheckboxPrimitive.Root
      className={clsx(
        'shrink-0 w-4 h-4 rounded border-2 border-[#D1D5DB] flex items-center justify-center',
        'data-[state=checked]:bg-[#1C2134] data-[state=checked]:border-none data-[state=checked]:text-white',
        'disabled:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-50'
      )}
      disabled={disabled}
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <CheckboxPrimitive.Indicator>
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label}
  </label>
);

export default CheckBox;
