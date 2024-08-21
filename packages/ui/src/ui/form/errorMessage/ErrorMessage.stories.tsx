import {ErrorMessage} from './ErrorMessage';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof ErrorMessage> = {
  title: 'Form/ErrorMessage',
  component: ErrorMessage,
  argTypes: {
    children: {
      control: 'text',
    },
    isError: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
  args: {
    children: 'ErrorMessage',
  },
};
