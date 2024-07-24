import type { Meta, StoryObj } from '@storybook/react';
import BottomNavigation from './BottomNavigation';

const meta: Meta<typeof BottomNavigation> = {
  component: BottomNavigation,
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

export const Primary: Story = {
  args: {},
};
