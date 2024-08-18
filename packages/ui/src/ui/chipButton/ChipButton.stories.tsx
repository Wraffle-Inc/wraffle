import type { Meta, StoryFn } from "@storybook/react";
import { RoundButton } from "./ChipButton";

const meta: Meta<typeof RoundButton> = {
  title: "Components/RoundButton",
  component: RoundButton,
  argTypes: {
    selected: {
      control: { type: "boolean" },
    },
    children: {
      control: { type: "text" },
    },
  },
  tags: ["autodocs"],
};

export default meta;

const Template: StoryFn<typeof RoundButton> = (args) => (
  <RoundButton {...args} />
);

export const ChipButton = Template.bind({});
ChipButton.args = {
  children: "Category",
  selected: false,
};
