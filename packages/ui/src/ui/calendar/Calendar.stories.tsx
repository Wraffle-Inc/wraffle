import {Calendar} from './Calendar';
import {useState} from 'react';
import type {SelectRangeEventHandler, DateRange} from 'react-day-picker';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
    },
    selected: {
      control: false,
    },
    onSelect: {
      control: false,
    },
    required: {
      control: 'boolean',
    },
    min: {
      control: 'number',
      if: {arg: 'mode', eq: 'multiple'},
    },
    max: {
      control: 'number',
      if: {arg: 'mode', eq: 'multiple'},
    },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Single: Story = {
  render: args => {
    const [selected, setSelected] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        {...args}
        mode='single'
        selected={selected}
        onSelect={setSelected}
      />
    );
  },
  args: {
    mode: 'single',
    required: false,
  },
};

export const Multiple: Story = {
  render: args => {
    const [selected, setSelected] = useState<Date[] | undefined>([new Date()]);
    return (
      <Calendar
        {...args}
        mode='multiple'
        selected={selected}
        onSelect={setSelected}
      />
    );
  },
  args: {
    mode: 'multiple',
    min: 1,
    max: 5,
  },
};

export const Range: Story = {
  render: () => {
    const [selected, setSelected] = useState<DateRange | undefined>({
      from: new Date(2025, 2, 1),
      to: new Date(2025, 2, 3),
    });
    const handleSelect: SelectRangeEventHandler = range => setSelected(range);
    return (
      <Calendar mode='range' selected={selected} onSelect={handleSelect} />
    );
  },
};
