import {Label} from '../form';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

interface RadioGroupProps {
  items: {
    value: string;
    label: string;
    disabled: boolean;
  }[];
  onValueChange: (value: string) => void;
  defaultValue?: string;
  className?: string;
}

interface RadioButtonProps {
  label: string;
  value: string;
  disabled: boolean;
  className?: string;
}

const RadioGroup = ({
  items,
  onValueChange,
  defaultValue,
  className,
}: RadioGroupProps) => (
  <RadioGroupPrimitive.Root
    className={className}
    defaultValue={defaultValue}
    onValueChange={onValueChange}
  >
    {items.map(item => (
      <RadioButton
        key={item.label}
        value={item.value}
        label={item.label}
        disabled={item.disabled}
      />
    ))}
  </RadioGroupPrimitive.Root>
);

export default RadioGroup;

const RadioButton = ({value, label, disabled}: RadioButtonProps) => (
  <div className='flex items-center gap-3'>
    <RadioGroupPrimitive.Item
      disabled={disabled}
      className='h-[22px] w-[22px] rounded-full border-2 border-solid border-[#E5E8EB] bg-white disabled:cursor-not-allowed disabled:bg-[#F1F5F9] disabled:opacity-60'
      value={value}
      id={value}
    >
      <RadioGroupPrimitive.Indicator className='relative flex h-full w-full items-center justify-center after:h-3 after:w-3 after:rounded-full after:bg-black' />
    </RadioGroupPrimitive.Item>
    <Label htmlFor={value}>{label}</Label>
  </div>
);
