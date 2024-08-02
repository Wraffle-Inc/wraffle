import { InputField } from "./InputField";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputField> = {
  title: "Form/InputField",
  component: InputField,
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    children: (
      <InputField>
        <InputField.Label htmlFor="example">Label</InputField.Label>
        <InputField.Input id="example" placeholder="Enter text here" />
      </InputField>
    ),
  },
};

export const WithFailedMessage: Story = {
  args: {
    children: (
      <InputField>
        <InputField.Label htmlFor="example-success">Label</InputField.Label>
        <InputField.Input id="example-success" placeholder="Enter text here" />
        <InputField.ErrorMessage isError>
          Failed message
        </InputField.ErrorMessage>
      </InputField>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: (
      <InputField>
        <InputField.Label htmlFor="example-disabled">Label</InputField.Label>
        <InputField.Input
          id="example-disabled"
          placeholder="Enter text here"
          disabled
        />
      </InputField>
    ),
  },
};
