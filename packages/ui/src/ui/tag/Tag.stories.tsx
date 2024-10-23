import {Tag} from './Tag';
import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    children: {
      control: {type: 'text'},
    },
    noHash: {
      control: {type: 'boolean'},
    },
    handleRemoveTag: {},
  },
};

export default meta;

const Template: StoryFn<typeof Tag> = args => <Tag {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Tag',
  noHash: false,
};

export const TagWithRemoveButton = Template.bind({});
TagWithRemoveButton.args = {
  children: 'Removable Tag',
  noHash: true,
  handleRemoveTag: (tag: string) => {
    console.log(`Removing tag: ${tag}`);
  },
};
