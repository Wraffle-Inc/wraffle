import {TooltipDemo} from './Tooltip';
import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof TooltipDemo> = {
  title: 'Components/Tooltip',
  component: TooltipDemo,
  argTypes: {
    children: {
      control: {type: 'text'},
    },
  },
};

export default meta;

const Template: StoryFn<typeof TooltipDemo> = args => <TooltipDemo {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  children: 'Tooltip',
};
