import {CalendarForm} from './Calendar';
import {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof CalendarForm> = {
  component: CalendarForm,
  title: 'Components/Calendar',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const CalendarFormDefault: Story = {
  name: 'Default',
  args: {
    dateLabel: '선택한 날짜가 표시되기 전 보여지는 라벨입니다',
  },
  render: args => {
    const [selected, setSelected] = useState<Date | undefined>();
    return (
      <CalendarForm
        {...args}
        selected={selected}
        setSelected={setSelected}
        fromDate={new Date()}
      />
    );
  },
};

export const CalendarWithFromDate: Story = {
  name: 'FromDate',
  args: {...CalendarFormDefault.args},
  render: args => {
    const [selected, setSelected] = useState<Date | undefined>();
    return (
      <CalendarForm
        {...args}
        fromDate={new Date()}
        selected={selected}
        setSelected={setSelected}
      />
    );
  },
};

export const CalendarFormSelected: Story = {
  name: 'Selected',
  args: {...CalendarFormDefault.args},
  render: args => {
    const [selected, setSelected] = useState<Date | undefined>(new Date());
    return (
      <CalendarForm {...args} selected={selected} setSelected={setSelected} />
    );
  },
};
