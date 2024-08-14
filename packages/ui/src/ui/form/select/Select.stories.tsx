import { Select } from "./Select";
import type { Meta, StoryFn } from "@storybook/react";

const meta: Meta<typeof Select> = {
  title: "Form/Select",
  component: Select,
  argTypes: {
    placeholder: {
      table: {
        type: { summary: "string" },
        category: "Value",
      },
    },
    items: {
      table: {
        category: "Content",
        type: { summary: "SelectItem[] | GroupSelectItem[]" },
      },
      control: { type: "object" },
    },
  },
  decorators: [(Story) => <div className="w-full">{Story()}</div>],
};

export default meta;

const Template: StoryFn<typeof Select> = (args) => <Select {...args} />;

export const Simple = Template.bind({});

Simple.args = {
  placeholder: "Theme",
  items: [
    {
      value: "light",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "system",
      name: "System",
    },
  ],
};

export const Group = Template.bind({});
Group.args = {
  placeholder: "Choose a dinosaur",
  items: [
    {
      groupName: "Theropods",
      groupItems: [
        {
          value: "thyanno",
          name: "Tyrannosaurus",
        },
        {
          value: "veloci",
          name: "Velociraptor",
        },
        {
          value: "deino",
          name: "Deinonychus",
        },
      ],
    },
    {
      groupName: "Sauropods",
      groupItems: [
        {
          value: "diplo",
          name: "Diplodocus",
        },
        {
          value: "salta",
          name: "Saltasaurus",
        },
        {
          value: "apato",
          name: "Apatosaurus",
        },
      ],
    },
  ],
};
