import { Select } from "@/ui/select/Select";
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

export const WithSelectBox: Story = {
  args: {
    children: (
      <InputField>
        <InputField.Label htmlFor="phone">Phone Number</InputField.Label>
        <Select
          placeholder="선택"
          items={[
            { value: "010", name: "010" },
            { value: "02", name: "02" },
            { value: "031", name: "031" },
            { value: "032", name: "032" },
          ]}
        />
        <InputField.Input
          id="middle"
          placeholder=""
          type="number"
          maxLength={4}
        />
        <InputField.Input
          id="last"
          placeholder=""
          type="number"
          maxLength={4}
        />
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
