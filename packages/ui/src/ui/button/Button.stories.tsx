import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "기본 버튼",
    variant: "default",
  },
};

export const Gray: Story = {
  args: {
    children: "회색 버튼",
    variant: "gray",
  },
};

export const Stroke: Story = {
  args: {
    children: "테두리 버튼",
    variant: "stroke",
  },
};

export const Disabled: Story = {
  args: {
    children: "비활성화 버튼",
    variant: "disabled",
    disabled: true,
  },
};
