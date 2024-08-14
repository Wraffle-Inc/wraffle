import type { Meta, StoryFn } from "@storybook/react";
import { TooltipDemo } from "./Tooltip";

const meta: Meta<typeof TooltipDemo> = {
  title: "Components/Tooltip",
  component: TooltipDemo,
  argTypes: {
    children: {
      control: { type: "text" },
    },
  },
  tags: ["autodocs"],
};

export default meta;

const Template: StoryFn<typeof TooltipDemo> = (args) => (
  <TooltipDemo {...args} />
);
export const Default = Template.bind({});
Default.args = {
  children: "Tooltip",
};
