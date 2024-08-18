import type { Meta, StoryObj } from '@storybook/react';
import SVGIcon from './SVGIcon';

const meta = {
  component: SVGIcon,
  title: 'shared/SVGIcon',
} satisfies Meta<typeof SVGIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SVGIconSearch: Story = {
  name: 'SVGIcon-Search',
  args: { id: 'search' },
};

export const SVGIconMenu: Story = {
  name: 'SVGIcon-Menu',
  args: { id: 'menu' },
};
