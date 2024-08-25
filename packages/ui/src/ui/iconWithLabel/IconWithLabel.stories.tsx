import type { Meta, StoryObj } from '@storybook/react';
import IconWithLabel from './IconWithLabel';
import MenuIcon from '@/shared/icons/MenuIcon';

const meta: Meta<typeof IconWithLabel> = {
  component: IconWithLabel,
};

export default meta;
type Story = StoryObj<typeof IconWithLabel>;

export const MenuIconWithLabel: Story = {
  args: {
    Icon: <MenuIcon className="w-6 h-6" storkeColor="currentColor" />,
    label: 'Search',
  },
};
