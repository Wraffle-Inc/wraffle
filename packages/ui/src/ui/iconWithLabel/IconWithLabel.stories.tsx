import IconWithLabel from './IconWithLabel';
import type {Meta, StoryObj} from '@storybook/react';
import {Icon} from '@wds/ui/icon/Icon';

const meta: Meta<typeof IconWithLabel> = {
  component: IconWithLabel,
  argTypes: {
    Icon: {
      description: '아이콘',
      control: {
        value: {
          defaultValue: <Icon name='search' />,
        },
      },
      table: {
        type: {summary: 'ReactNode'},
      },
    },
    label: {
      description: '라벨',
      table: {
        type: {summary: 'string'},
      },
    },
    stroke: {
      description: '아이콘의 테두리 색상',
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconWithLabel>;

export const SearchIconWithLabel: Story = {
  args: {
    Icon: <Icon name='search' />,
    label: 'Search',
  },
};
