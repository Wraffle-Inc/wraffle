import type { Meta, StoryFn } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      options: ["default", "gray", "stroke"],
      control: { type: "select" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    children: {
      control: { type: "text" },
    },
  },
  tags: ["autodocs"],
};

export default meta;

const Template: StoryFn = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { children: "기본 버튼", variant: "default" };

export const Gray = Template.bind({});
Gray.args = { children: "회색 버튼", variant: "gray" };

export const Stroke = Template.bind({});
Stroke.args = { children: "테두리 버튼", variant: "stroke" };
