import {RaffleCard} from './RaffleCard';
import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof RaffleCard> = {
  title: 'Components/RaffleCard',
  component: RaffleCard,
  argTypes: {
    name: {
      control: 'text',
    },
    price: {
      control: 'text',
    },
    hashtags: {
      control: {type: 'object'},
    },
    scrapCount: {
      control: 'number',
    },
    thumbnailUrl: {
      control: 'text',
    },
    endDate: {
      control: 'text',
    },
    isBookmarked: {
      control: 'boolean',
    },
  },
  args: {
    name: '[Vans] 올드스쿨',
    price: '78,000',
    hashtags: [
      {
        id: 1,
        name: '한정판',
      },
      {
        id: 2,
        name: 'Vans',
      },
    ],
    scrapCount: 3100,
    thumbnailUrl: 'https://shorturl.at/HMedV',
    isBookmarked: true,
  },
};

export default meta;

const Template: StoryFn<typeof RaffleCard> = args => <RaffleCard {...args} />;

export const Default = Template.bind({});

export const Closed = Template.bind({});
Closed.args = {...Default.args, endDate: '2024-08-02 23:20:59'};

export const TagOverflow = Template.bind({});
TagOverflow.args = {
  ...Default.args,
  hashtags: [
    {
      id: 1,
      name: '한정판',
    },
    {
      id: 2,
      name: 'Vans',
    },
    {
      id: 3,
      name: '신발',
    },
    {
      id: 4,
      name: '컨버스',
    },
  ],
};
