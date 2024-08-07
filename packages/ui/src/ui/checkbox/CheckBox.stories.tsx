import type { Meta, StoryObj } from '@storybook/react';
import CheckBox from './CheckBox';

const meta = {
  component: CheckBox,
  title: 'Components/CheckBox',
  tags: ['autodocs'],
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckBoxDefault: Story = {
  name: 'CheckBox',
  args: { label: '' },
};

export const CheckBoxDisabled: Story = {
  name: 'CheckBox-Disabled',
  args: { label: '', disabled: true },
};

export const CheckBoxChecked: Story = {
  name: 'CheckBox-Checked',
  args: { label: '', checked: true },
};

export const CheckBoxCheckedDisabled: Story = {
  name: 'CheckBox-Checked-Disabled',
  args: { label: '', checked: true, disabled: true },
};

export const CheckBoxWithLabel: Story = {
  name: 'CheckBox-Label',
  args: {
    label: 'asdfadsfsadfsadfasdfsadfsdfadsfdf',
    labelClassName: "text-red-500",
  },
};
