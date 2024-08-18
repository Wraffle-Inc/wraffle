import type { Meta, StoryObj } from '@storybook/react';
import RadioGroup from './RadioGroup';

const meta = {
  component: RadioGroup,
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

interface ItemProps {
  value: string;
  label: string;
  disabled: boolean;
}

const DefaultButtonItems: ItemProps[] = [
  { value: 'example1', label: 'Example1', disabled: false },
];

const DisabledButtonItem: ItemProps[] = [
  { value: 'example1', label: 'Example1', disabled: true },
];

const GroupButtonItems: ItemProps[] = [
  { value: 'example1', label: 'Example1', disabled: false },
  { value: 'example2', label: 'Example2', disabled: false },
  { value: 'example3', label: 'Disabled Button', disabled: true },
];

export const RadioButtonDefault: Story = {
  name: 'RadioButton',
  args: {
    items: DefaultButtonItems,
    onValueChange: () => {},
    defaultValue: '',
    className: 'flex flex-col gap-4',
  },
};
export const RadioButtonDisabled: Story = {
  name: 'RadioButton-Disabled',
  args: {
    items: DisabledButtonItem,
    onValueChange: () => {},
    defaultValue: '',
    className: 'flex flex-col gap-4',
  },
};

export const RadioButtonCheckedDisabled: Story = {
  name: 'RadioButton-Checked-Disabled',
  args: {
    items: DisabledButtonItem,
    onValueChange: () => {},
    defaultValue: 'example1',
    className: 'flex flex-col gap-4',
  },
};

export const RadioGroupDefault: Story = {
  name: 'RadioGroup',
  args: {
    items: GroupButtonItems,
    onValueChange: () => {},
    defaultValue: '',
    className: 'flex flex-col gap-4',
  },
};
