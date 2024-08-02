import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Form/Label",
  component: Label,
  argTypes: {
    children: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Default Label",
  },
};
