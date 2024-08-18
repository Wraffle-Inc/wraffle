import type { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';

const meta = {
  component: Switch,
  title: 'Components/Switch',
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SwitchDefault: Story = {
  name: 'Switch',
  args: { id: '', onCheckedChange: () => {} },
};

export const UnSwitchDisabled: Story = {
  name: 'Switch-Disabled',
  args: { id: '', onCheckedChange: () => {}, disabled: true },
};

export const Switched: Story = {
  name: 'Switched',
  args: { id: '', onCheckedChange: () => {}, checked: true },
};

export const SwitchedDisabled: Story = {
  name: 'Switched-Disabled',
  args: { id: '', onCheckedChange: () => {}, checked: true, disabled: true },
};
