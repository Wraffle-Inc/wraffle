import type { Meta, StoryObj } from "@storybook/react";

import { ErrorMessage } from "./ErrorMessage";

const meta: Meta<typeof ErrorMessage> = {
  title: "Form/ErrorMessage",
  component: ErrorMessage,
  argTypes: {
    children: {
      control: "text",
    },
    isError: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
  args: {
    children: "ErrorMessage",
  },
};
