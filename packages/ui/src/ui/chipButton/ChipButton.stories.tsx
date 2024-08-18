import type { Meta, StoryFn } from "@storybook/react";
import { ChipButton } from "./ChipButton";

const meta: Meta<typeof ChipButton> = {
  title: "Components/ChipButton",
  component: ChipButton,
  argTypes: {
    selected: {
      control: { type: "boolean" },
    },
    children: {
      control: { type: "text" },
    },
  },
};

export default meta;

const Template: StoryFn<typeof ChipButton> = (args) => <ChipButton {...args} />;

export const ChipSelected = Template.bind({});
ChipSelected.args = {
  children: "Category",
  selected: true,
};
export const ChipNotSelected = Template.bind({});
ChipNotSelected.args = {
  children: "Category",
  selected: false,
};
