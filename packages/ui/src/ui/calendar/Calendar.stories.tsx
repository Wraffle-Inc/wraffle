import type { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';

const meta = {
  component: Calendar,
  title: 'Components/Calendar',
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CalendarDefault: Story = {
  name: 'Calendar',
  args: {},
};
