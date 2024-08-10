import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import clsx from 'clsx';

interface RadioGroupProps {
  items: { value: string; label: string; disabled: boolean }[];
  onValueChange: (value: string) => void;
  defaultValue: string;
  radioGroupClassName: string;
  labelClassName: string;
}

interface RadioButtonProps {
  label: string;
  value: string;
  disabled: boolean;
  labelClassName: string;
}

const RadioGroup = ({
  items,
  onValueChange,
  defaultValue,
  radioGroupClassName,
  labelClassName,
}: RadioGroupProps) => (
  <RadioGroupPrimitive.Root
    className={radioGroupClassName}
    defaultValue={defaultValue}
    onValueChange={onValueChange}
  >
    {items.map((item) => (
      <RadioButton
        value={item.value}
        label={item.label}
        disabled={item.disabled}
        labelClassName={labelClassName}
      />
    ))}
  </RadioGroupPrimitive.Root>
);

export default RadioGroup;

const RadioButton = ({
  value,
  label,
  disabled,
  labelClassName,
}: RadioButtonProps) => (
  <div className='flex items-center gap-3'>
    <RadioGroupPrimitive.Item
      disabled={disabled}
      className='bg-white w-[22px] h-[22px] rounded-full border-2 border-solid  border-[#E5E8EB] disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-[#F1F5F9]'
      value={value}
    >
      <RadioGroupPrimitive.Indicator className='flex items-center justify-center w-full h-full relative after:w-3 after:h-3 after:rounded-full after:bg-black' />
    </RadioGroupPrimitive.Item>
    <label className={labelClassName}>{label}</label>
  </div>
);
