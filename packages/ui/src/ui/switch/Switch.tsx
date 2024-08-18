import * as SwitchPrimitive from '@radix-ui/react-switch';
import clsx from 'clsx';

interface SwitchProps {
  id: string;
  checked?: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Switch = ({ id, checked, disabled, onCheckedChange }: SwitchProps) => (
  <SwitchPrimitive.Root
    checked={checked}
    disabled={disabled}
    onCheckedChange={onCheckedChange}
    className={clsx(
      'w-9 h-5 rounded-full relative bg-black/[.2] data-[state=checked]:bg-black outline-none',
      'disabled:cursor-not-allowed disabled:opacity-35'
    )}
    id={id}
  >
    <SwitchPrimitive.Thumb className='block w-4 h-4 bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]' />
  </SwitchPrimitive.Root>
);

export default Switch;
