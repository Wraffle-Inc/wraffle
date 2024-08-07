import type { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';

const meta = {
  component: Switch,
  title: 'Components/Switch',
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SwitchDefault: Story = {
  name: 'Switch',
  args: {},
};

export const UnSwitchDisabled: Story = {
  name: 'Switch-Disabled',
  args: { disabled: true },
};

export const Switched: Story = {
  name: 'Switched',
  args: { checked: true },
};

export const SwitchedDisabled: Story = {
  name: 'Switched-Disabled',
  args: { checked: true, disabled: true },
};
