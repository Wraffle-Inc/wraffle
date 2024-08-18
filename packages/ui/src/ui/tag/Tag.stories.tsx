import type { Meta, StoryFn } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  argTypes: {
    children: {
      control: { type: "text" },
    },
  },
};

export default meta;

const Template: StoryFn<typeof Tag> = (args) => <Tag {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Tag",
};
