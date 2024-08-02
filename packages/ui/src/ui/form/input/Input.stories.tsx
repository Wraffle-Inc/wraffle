import type { Meta, StoryFn } from "@storybook/react";
import { Input, InputProps } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  component: Input,
  argTypes: {
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

const Template: StoryFn<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Default Input",
};
