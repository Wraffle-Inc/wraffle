import clsx from 'clsx';
import * as SwitchPrimitive from '@radix-ui/react-switch';

interface SwitchProps {
  id: string;
  checked?: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Switch = ({id, checked, disabled, onCheckedChange}: SwitchProps) => (
  <SwitchPrimitive.Root
    checked={checked}
    disabled={disabled}
    onCheckedChange={onCheckedChange}
    className={clsx(
      'relative h-5 w-9 rounded-full bg-black/[.2] outline-none data-[state=checked]:bg-black',
      'disabled:cursor-not-allowed disabled:opacity-35',
    )}
    id={id}
  >
    <SwitchPrimitive.Thumb className='block h-4 w-4 translate-x-0.5 rounded-full bg-white transition-transform duration-200 will-change-transform data-[state=checked]:translate-x-[19px]' />
  </SwitchPrimitive.Root>
);

export default Switch;
