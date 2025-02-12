import {ColorLabel} from './ColorLabel';
import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof ColorLabel> = {
  title: 'Components/ColorLabel',
  component: ColorLabel,
  argTypes: {
    color: {
      description: '텍스트 색상',
      control: {type: 'text'},
    },
    size: {
      description: '텍스트 사이즈',
      table: {
        type: {summary: 'enum'},
      },
      control: {
        type: 'select',
        options: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'p1',
          'p2',
          'p3',
          'p4',
          'sm1',
          'sm2',
        ],
      },
    },
    children: {
      control: {type: 'text'},
    },
  },
};

export default meta;

const Template: StoryFn<typeof ColorLabel> = args => <ColorLabel {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: '과일',
};

export const ColorLabelWithColor = Template.bind({});
ColorLabelWithColor.args = {
  color: '#059669',
  children: '후숙 과일',
};

export const ColorLabelWithSize = Template.bind({});
ColorLabelWithSize.args = {
  size: 'p2',
  children: '생일',
};
