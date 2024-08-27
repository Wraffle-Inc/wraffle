import type { Meta, StoryObj } from '@storybook/react';
import CalendarForm from './Calendar';
import { useState } from 'react';

const meta = {
  component: CalendarForm,
  title: 'Components/Calendar',
} satisfies Meta<typeof CalendarForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const CalendarForRender = (args: any) => {
  const [selected, setSelected] = useState<Date | undefined>();

  return (
    <CalendarForm {...args} selected={selected} setSelected={setSelected} />
  );
};

export const CalendarFormDefault: Story = {
  name: 'CalendarForm',
  args: {
    formLabel: '어떤 일정을 정할지에 대해 작성하는 라벨입니다.',
    className: '',
    dateLabel: '선택한 날짜가 표시되기 전 보여지는 라벨입니다',
    selected: undefined,
    setSelected: () => {},
  },
  render: (args) => <CalendarForRender {...args} />,
};
