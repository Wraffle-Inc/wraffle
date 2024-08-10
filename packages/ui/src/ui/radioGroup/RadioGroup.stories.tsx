import type { Meta, StoryObj } from '@storybook/react';
import RadioGroup from './RadioGroup';

const meta = {
  component: RadioGroup,
  title: 'Components/RadioGroup',
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const items1: { value: string; label: string; disabled: boolean }[] = [
  { value: 'example1', label: 'Example1', disabled: false },
];

const items2: { value: string; label: string; disabled: boolean }[] = [
  { value: 'example1', label: 'Example1', disabled: true },
];

const items3: { value: string; label: string; disabled: boolean }[] = [
  { value: 'example1', label: 'Example1', disabled: false },
  { value: 'example2', label: 'Example2', disabled: false },
];

export const RadioButtonDefault: Story = {
  name: 'RadioButton',
  args: {
    items: items1,
    onValueChange: () => {},
    defaultValue: '',
    radioGroupClassName: 'flex flex-col gap-4',
    labelClassName: '',
  },
};
export const RadioButtonDisabled: Story = {
  name: 'RadioButton-Disabled',
  args: {
    items: items2,
    onValueChange: () => {},
    defaultValue: '',
    radioGroupClassName: 'flex flex-col gap-4',
    labelClassName: '',
  },
};

export const RadioButtonCheckedDisabled: Story = {
  name: 'RadioButton-Checked-Disabled',
  args: {
    items: items2,
    onValueChange: () => {},
    defaultValue: 'example1',
    radioGroupClassName: 'flex flex-col gap-4',
    labelClassName: '',
  },
};

export const RadioGroupDefault: Story = {
  name: 'RadioGroup',
  args: {
    items: items3,
    onValueChange: () => {},
    defaultValue: 'example1',
    radioGroupClassName: 'flex flex-col gap-4',
    labelClassName: 'text-red-200 text-xl',
  },
};
