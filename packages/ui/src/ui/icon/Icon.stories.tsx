import {Icon} from './Icon';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  component: Icon,
  argTypes: {
    id: {
      description: '아이콘의 아이디',
      control: {
        type: 'select',
        options: [
          'arrow-bottom',
          'arrow-right',
          'arrow-left',
          'menu',
          'search',
          'home',
          'gift',
          'user-circle',
          'cart',
          'shopping-box',
          'setting',
          'plus',
          'bell',
          'bookmark',
          'bookmark-fill',
          'heart',
          'heart-fill',
          'user',
          'credit-card',
          'upload',
          'calendar',
          'write',
        ],
      },
    },
    width: {
      description: '아이콘의 너비',
      table: {
        type: {summary: 'number'},
      },
      control: {
        type: 'number',
        value: {
          defaultValue: 20,
        },
      },
    },
    height: {
      description: '아이콘의 높이',
      table: {
        type: {summary: 'number'},
      },
      control: {
        type: 'number',
        value: {
          defaultValue: 20,
        },
      },
    },
    showBadge: {
      description: '아이콘 오른쪽 상단에 뱃지를 표시할지 여부',
      table: {
        type: {summary: 'boolean'},
      },
    },
    badgeCount: {
      description: '아이콘 오른쪽 상단에 표시할 숫자',
      table: {
        type: {summary: 'number'},
      },
      control: {
        value: {
          defaultValue: null,
        },
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: {name: 'home'},
};

export const IconWithBadge: Story = {
  name: 'SVGIcon-Badge',
  args: {name: 'bell', showBadge: true},
};

export const IconWithBadgeCount: Story = {
  name: 'SVGIcon-BadgeCount',
  args: {name: 'cart', showBadge: true, badgeCount: 10},
};
