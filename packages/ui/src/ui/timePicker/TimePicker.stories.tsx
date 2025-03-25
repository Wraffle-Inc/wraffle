import type {TimePickerProps} from './TimePicker';
import {TimePicker} from './TimePicker';
import {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  name: '12hours format',
  render: (args: TimePickerProps) => <TimePicker {...args} />,
};

export const DefaultInfinite: Story = {
  name: '12 hours format with infinite',
  render: (args: TimePickerProps) => <TimePicker {...args} infinite={true} />,
  args: {
    infinite: true,
  },
};

export const format24: Story = {
  name: '24 hours format ',
  render: (args: TimePickerProps) => <TimePicker {...args} />,
  args: {
    hourFormat: '24',
  },
};

export const format24infinite: Story = {
  name: '24 hours format with infinite',
  render: (args: TimePickerProps) => <TimePicker {...args} />,
  args: {
    hourFormat: '24',
    infinite: true,
  },
};

export const TimePickerwithState: Story = {
  name: 'TimePicker with State example',
  render: () => {
    const [time, setTime] = useState<{hour: number; minute: number}>({
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
    });

    const handleTimeChange = (hour: number, minute: number) => {
      setTime({hour, minute});
    };
    return (
      <div>
        <h1>
          선택된 시간: {time.hour}:{time.minute}
        </h1>
        <TimePicker
          onChange={handleTimeChange}
          infinite={true}
          hourFormat='12'
        />
      </div>
    );
  },
};
