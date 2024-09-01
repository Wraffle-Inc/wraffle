import IconWithLabel from './IconWithLabel';
import type {Meta, StoryObj} from '@storybook/react';
import {Icon} from '@wds/ui/icon/Icon';

const meta: Meta<typeof IconWithLabel> = {
  component: IconWithLabel,
};

export default meta;
type Story = StoryObj<typeof IconWithLabel>;

export const MenuIconWithLabel: Story = {
  args: {
    Icon: <Icon name='menu' width={20} height={20} />,
    label: 'Search',
  },
};
